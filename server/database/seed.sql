INSERT INTO grados (id, nombre, orden) VALUES
(1, 'Policía', 1),
(2, 'Cabo', 2),
(3, 'Sargento Segundo', 3),
(4, 'Sargento Primero', 4),
(5, 'Suboficial Segundo', 5),
(6, 'Suboficial Primero', 6),
(7, 'Suboficial Mayor', 7),
(8, 'Subteniente', 8),
(9, 'Teniente', 9),
(10, 'Capitán', 10),
(11, 'Mayor', 11),
(12, 'Teniente Coronel', 12),
(13, 'Coronel', 13)
ON CONFLICT (id) DO NOTHING;

INSERT INTO personal (
  escalafon,
  primer_nombre,
  segundo_nombre,
  ap_paterno,
  ap_materno,
  grado_id,
  ci,
  exp,
  genero,
  altura_cm,
  peso_kg
) VALUES (
  'ESC-001',
  'Carlos',
  'Miguel',
  'Mamani',
  'Quispe',
  9,
  '1234567',
  'CBBA',
  'Masculino',
  170,
  75
)
ON CONFLICT (ci) DO NOTHING;