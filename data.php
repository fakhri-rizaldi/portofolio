<?php

return [
    'profile' => [
        'name' => 'Fakhri', 
        'title' => 'Portofolio',
        'email' => 'muhamadfakhri06@gmail.com',
        'phone' => '+62 812 3456 7890',
        'location' => 'Indonesia',
        'summary' => 'Mahasiswa Teknik Informatika dari Universitas Komputer Indonesia. Saya senang memecahkan masalah yang kompleks dan mempelajari teknologi baru.',
        'socials' => [
            'linkedin' => 'https://www.linkedin.com/in/muhamad-fakhri-399193292/',
            'instagram' => 'https://www.instagram.com/sobatfakhri/?hl=en',
        ],
    ],
    'career_interests' => [
        [
            'title' => 'Data Scientist',
            'description' => 'Mengungkap pola tersembunyi dalam kumpulan data yang kompleks untuk mendorong pengambilan keputusan yang cerdas. Bersemangat membangun model prediksi dan memanfaatkan machine learning untuk memecahkan masalah dunia nyata.',
            'icon' => 'science', // specialized conceptual icon
            'tags' => ['Machine Learning', 'Python', 'Predictive Modeling', 'AI']
        ],
        [
            'title' => 'Data Analyst',
            'description' => 'Mengubah data mentah menjadi wawasan yang dapat ditindaklanjuti melalui penceritaan dan visualisasi. Spesialis dalam membuat dasbor interaktif yang memberdayakan bisnis untuk memahami kinerja mereka secara sekilas.',
            'icon' => 'analytics',
            'tags' => ['Visualisasi Data', 'SQL', 'Business Intelligence', 'Looker']
        ],
    ],
    'experience' => [
        [
            'role' => 'Divisi P3K',
            'company' => 'Volunteer GAMATIF 2024',
            'period' => '2024',
            'description' => 'Bertanggung jawab atas kesehatan dan keselamatan peserta serta panitia selama acara berlangsung. Siap sedia menangani pertolongan pertama pada kecelakaan ringan dan memastikan kondisi fisik seluruh elemen acara tetap prima.',
            'type' => 'volunteer' 
        ],
        [
            'role' => 'Divisi Design Graphic',
            'company' => 'PT INTI OPTIMA TEKNOLOGI',
            'period' => '2022',
            'description' => 'Praktik Kerja Lapangan. Bertanggung jawab membuat desain grafis untuk kebutuhan perusahaan dan menciptakan karakter maskot 3D menggunakan software Blender.',
            'type' => 'internship'
        ],
    ],
    'education' => [
        [
            'institution' => 'University of Technology',
            'degree' => 'Bachelor of Science in Computer Science',
            'period' => '2017 - 2021',
        ]
    ],
    'skills' => [
        [
            'name' => 'PHP',
            'logo' => 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg'
        ],
        [
            'name' => 'Laravel',
            'logo' => 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg'
        ],
        [
            'name' => 'MySQL',
            'logo' => 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg'
        ],
        [
            'name' => 'Python',
            'logo' => 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'
        ],
    ],
    'editing_skills' => [
        [
            'name' => 'Figma',
            'logo' => 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg'
        ],
        [
            'name' => 'Adobe Photoshop',
            'logo' => 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg'
        ],
        [
            'name' => 'Adobe Illustrator',
            'logo' => 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/illustrator/illustrator-plain.svg'
        ],
        [
            'name' => 'Adobe Premiere Pro',
            'logo' => 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-original.svg'
        ],
        [
            'name' => 'Canva',
            'logo' => 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg'
        ],
        [
            'name' => 'CapCut',
            'logo' => 'https://cdn.brandfetch.io/idUmqKFgE3/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B'
        ],
    ],
    'projects' => [
        [
            'title' => 'Sistem Informasi Restoran',
            'description' => 'Sistem manajemen restoran multi-role (Admin, Kasir, Koki, Pelayan) dengan fitur pemesanan digital, reservasi meja, integrasi pembayaran Midtrans, manajemen stok menu, verifikasi pesanan dapur, dan dashboard keuangan.',
            'tech_stack' => ['Laravel', 'MySQL', 'Midtrans API'],
            'link' => 'https://restoranproif7.my.id',
            'preview_image' => 'assets/RP 0.jpg',
            'screenshots' => [
                'assets/RP 1.jpg',
                'assets/RP 2.jpg',
                'assets/RP 3.jpg',
                'assets/RP 4.jpg',
                'assets/RP 5.jpg'
            ]
        ],
        [
            'title' => 'Aplikasi DonasiYuk',
            'description' => 'Aplikasi donasi berbasis publik yang menghubungkan pendonasi dengan penerima manfaat secara cepat. Dilengkapi fitur live chat real-time menggunakan Laravel Livewire untuk komunikasi langsung.',
            'tech_stack' => ['Laravel', 'Livewire', 'Tailwind CSS'],
            'link' => 'https://fakhriproject.my.id',
            'preview_image' => 'assets/DY 1.jpg', // Preview Image
            'screenshots' => [
                'assets/DY 2.jpg',
                'assets/DY 3.jpg',
                'assets/DY 4.jpg',
                'assets/DY 5.jpg'
            ]
        ],
        [
            'title' => 'Analisis Strategis Startup (SE-Asia)',
            'description' => 'Dashboard visualisasi data yang menganalisis ekosistem startup di Asia Tenggara (2009-2013). Menampilkan tren investasi, dominasi pasar E-Commerce di Indonesia, peluang B2B Software, serta perbandingan distribusi pendanaan regional.',
            'tech_stack' => ['Looker Studio', 'Python', 'Data Analytics'],
            'link' => 'https://lookerstudio.google.com/s/l5Rtf3uRI1s',
            'preview_image' => 'assets/D1.jpg',
            'screenshots' => [
                'assets/D1.jpg'
            ]
        ],
    ]
];
