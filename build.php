<?php
// build.php
// Script to convert index.php into index.html for static hosting

// 1. Capture the output of index.php
ob_start();
require 'index.php';
$html = ob_get_clean();

// 2. Save to index.html
if (file_put_contents('index.html', $html)) {
    echo "Successfully generated index.html! You can now upload this file and the 'assets' folder to GitHub Pages.";
} else {
    echo "Failed to generate index.html.";
}
?>
