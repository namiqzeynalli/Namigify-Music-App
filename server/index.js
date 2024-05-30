const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'namiq123',
    database: 'namigify'
});

connection.connect((err) => {
    if (!err) {
        console.log("SUCCESS");
    } else {
        console.log("FAILURE", err.message);
    }
});

app.post('/playlist', (req, res) => {
    const { playlistName, favorites } = req.body;

    connection.query('INSERT INTO playlists (playlistName) VALUES (?)', [playlistName], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const playlistId = result.insertId;
        insertMusics(playlistId);
    });

    function insertMusics(playlistId) {
        const values = favorites.map((favorite) => [playlistId, favorite.id, favorite.name, favorite.image, favorite.audio, favorite.artist]);
        const placeholders = values.map(() => '(?, ?, ?, ?, ?, ?)').join(', ');
        const sql = `INSERT INTO musics (playlistId, musicId, musicName, image, audio, artist) VALUES ${placeholders}`;

        const flattenedValues = values.flat();

        connection.query(sql, flattenedValues, (err, data) => {
            if (!err) {
                res.status(201).json({ playlistId, playlistName, favorites });
            } else {
                console.log("Error:", err);
                res.status(500).json({ error: err.message });
            }
        });
    }
});


app.put('/playlist/:id', (req, res) => {
    const playlistId = req.params.id;
    const { playlistName, favorites } = req.body;

    connection.query('UPDATE playlists SET playlistName = ? WHERE id = ?', [playlistName, playlistId], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (favorites && favorites.length > 0) {
            const values = favorites.map((favorite) => [playlistId, favorite.id, favorite.name, favorite.image, favorite.audio, favorite.artist]);
            const placeholders = values.map(() => '(?, ?, ?, ?, ?, ?)').join(', ');
            const sql = `INSERT INTO musics (playlistId, musicId, musicName, image, audio, artist) VALUES ${placeholders} ON DUPLICATE KEY UPDATE musicName=VALUES(musicName), image=VALUES(image), audio=VALUES(audio), artist=VALUES(artist)`;

            const flattenedValues = values.flat();

            connection.query(sql, flattenedValues, (err) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.status(200).json({ message: 'Playlist updated successfully' });
            });
        } else {
            res.status(200).json({ message: 'Playlist updated successfully' });
        }
    });
});


app.get('/playlists', (req, res) => {
    const sql = `
        SELECT p.id, p.playlistName, 
               JSON_ARRAYAGG(JSON_OBJECT('musicId', m.musicId, 'musicName', m.musicName, 'image', m.image, 'audio', m.audio, 'artist', m.artist)) AS songs
        FROM playlists p
        LEFT JOIN musics m ON p.id = m.playlistId
        GROUP BY p.id, p.playlistName
    `;

    connection.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(results);
        }
    });
});

app.get('/playlist/:playlistId', (req, res) => {
    const { playlistId } = req.params;
    const sql = `
        SELECT p.id, p.playlistName, 
               JSON_ARRAYAGG(JSON_OBJECT('musicId', m.musicId, 'musicName', m.musicName, 'image', m.image, 'audio', m.audio, 'artist', m.artist)) AS songs
        FROM playlists p
        LEFT JOIN musics m ON p.id = m.playlistId
        WHERE p.id = ?
        GROUP BY p.id, p.playlistName
    `;

    connection.query(sql, [playlistId], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(results[0]);
        }
    });
});


app.delete('/playlist/:playlistId', (req, res) => {
    const { playlistId } = req.params;

    const deleteMusicsSql = 'DELETE FROM musics WHERE playlistId = ?';
    const deletePlaylistSql = 'DELETE FROM playlists WHERE id = ?';

    connection.query(deleteMusicsSql, [playlistId], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        connection.query(deletePlaylistSql, [playlistId], (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.status(200).json({ message: 'Playlist deleted successfully' });
        });
    });
});

app.delete('/playlist/:playlistId/song/:musicId', (req, res) => {
    const { playlistId, musicId } = req.params;

    connection.query('DELETE FROM musics WHERE playlistId = ? AND musicId = ?', [playlistId, musicId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Song deleted successfully' });
    });
});



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
