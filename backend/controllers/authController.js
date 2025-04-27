const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { username, password, database } = req.body;

  try {
    // Connexion dynamique selon base choisie
    const connection = await pool.getConnection();
    await connection.changeUser({ database });

    // Vérifier l'utilisateur
    const [rows] = await connection.execute('SELECT * FROM employees WHERE username = ?', [username]);
    const user = rows[0];

    if (!user) {
      return res.status(401).json({ message: 'Utilisateur non trouvé.' });
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Mot de passe incorrect.' });
    }

    // Générer un token
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username
      }
    });

    connection.release();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};
