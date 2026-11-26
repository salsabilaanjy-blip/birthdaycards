<?php
require "config.php";

$query = $conn->query("
    SELECT name, wish, created_at
    FROM guests
    WHERE attendance = 'Hadir'
    ORDER BY id DESC
");

$total = $query->num_rows;
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Guest Book - Aisyah</title>
    <link rel="stylesheet" href="style.css">
</head>

<body class="guestbook-page">

    <main class="guestbook-container">

        <div class="guestbook-decoration">✧ ♡ ✧</div>

        <h1 class="guestbook-title">Guest Book</h1>

        <p class="guestbook-count">
            <?= $total ?> tamu hadir
        </p>

        <div class="guestbook-list">

            <?php if ($total > 0): ?>

                <?php while ($guest = $query->fetch_assoc()): ?>

                    <article class="guest-message">

                        <div class="guest-avatar">♡</div>

                        <h3>
                            <?= htmlspecialchars($guest["name"]) ?>
                        </h3>

                        <p class="guest-wish">
                            <?= htmlspecialchars($guest["wish"] ?: "Terima kasih sudah hadir ♡") ?>
                        </p>

                    </article>

                <?php endwhile; ?>

            <?php else: ?>

                <div class="guest-empty">
                    <p>Belum ada tamu yang mengisi buku tamu.</p>
                </div>

            <?php endif; ?>

        </div>

        <a href="index.html" class="guestbook-back">
            ← Kembali
        </a>

        <div class="guestbook-footer">
            With love, Aisyah ♡
        </div>

    </main>

</body>
</html>