exports.createUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  console.log('userData:', userData);
  console.log('hashedPassword:', hashedPassword);

  const [result] = await pool.query(
    `INSERT INTO users
      (name, username, email, phone, address, dob, password)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      userData.name,
      userData.username,
      userData.email,
      userData.phone,
      userData.address,
      userData.dob,
      hashedPassword,
    ]
  );

  console.log('result:', result);

  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [result.insertId]);
  console.log('rows:', rows);

  return rows[0];
};