<?php
// Дополнительные настройки для главной страницы RPU
// Этот файл должен быть подключен в config.php

// Настройки секций главной страницы
$homepage_sections = array(
    // Новые релизы
    'new_releases_enabled' => '1',
    'new_releases_limit' => '5',
    'new_releases_title' => 'Новые релизы',
    'new_releases_link' => '/newcomics',
    
    // Новинки издательств
    'publisher_newcomics_enabled' => '1',
    'publisher_newcomics_limit' => '7',
    'publisher_newcomics_dc_enabled' => '1',
    'publisher_newcomics_dc_title' => 'Новинки DC',
    'publisher_newcomics_dc_link' => '/publisher/dc',
    'publisher_newcomics_marvel_enabled' => '1',
    'publisher_newcomics_marvel_title' => 'Новинки Marvel',
    'publisher_newcomics_marvel_link' => '/publisher/marvel',
    
    // Популярные серии
    'popular_series_enabled' => '1',
    'popular_series_limit' => '5',
    'popular_series_title' => 'Популярные серии',
    'popular_series_categories' => '124, 147, 9, 318, 271',
    
    // Популярное за месяц
    'monthly_popular_enabled' => '1',
    'monthly_popular_limit' => '3',
    'monthly_popular_title' => 'Популярное за месяц',
    'monthly_popular_days' => '30',
    
    // Популярные ваншоты
    'oneshot_popular_enabled' => '1',
    'oneshot_popular_limit' => '5',
    'oneshot_popular_title' => 'Популярные ваншоты',
    'oneshot_popular_tag' => 'Одиночный выпуск',
);

// Функция для получения настроек секции
function get_section_config($section_name) {
    global $homepage_sections;
    $config = array();
    
    foreach ($homepage_sections as $key => $value) {
        if (strpos($key, $section_name . '_') === 0) {
            $config_key = str_replace($section_name . '_', '', $key);
            $config[$config_key] = $value;
        }
    }
    
    return $config;
}

// Функция для проверки включена ли секция
function is_section_enabled($section_name) {
    global $homepage_sections;
    return isset($homepage_sections[$section_name . '_enabled']) && $homepage_sections[$section_name . '_enabled'] == '1';
}

?>
