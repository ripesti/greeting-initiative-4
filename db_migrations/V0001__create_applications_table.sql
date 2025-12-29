-- Создание таблицы для заявок
CREATE TABLE IF NOT EXISTS applications (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    service VARCHAR(255) NOT NULL,
    message TEXT,
    status VARCHAR(50) DEFAULT 'new',
    user_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индекс для быстрого поиска по статусу
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);

-- Индекс для быстрого поиска по дате создания
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON applications(created_at DESC);
