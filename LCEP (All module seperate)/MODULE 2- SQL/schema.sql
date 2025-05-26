CREATE DATABASE Event_Planner;
USE Event_Planner;

-- 1. Attendees Table (instead of Users)
CREATE TABLE Attendees (
    attendee_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email_address VARCHAR(100) NOT NULL UNIQUE,
    location VARCHAR(100) NOT NULL,
    signup_date DATE NOT NULL
);

-- 2. Occasions Table (instead of Events)
CREATE TABLE Occasions (
    occasion_id INT PRIMARY KEY AUTO_INCREMENT,
    event_name VARCHAR(200) NOT NULL,
    details TEXT,
    venue_city VARCHAR(100) NOT NULL,
    begin_datetime DATETIME NOT NULL,
    finish_datetime DATETIME NOT NULL,
    event_status ENUM('upcoming', 'completed', 'cancelled'),
    host_id INT,
    FOREIGN KEY (host_id) REFERENCES Attendees(attendee_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

-- 3. Talks Table (instead of Sessions)
CREATE TABLE Talks (
    talk_id INT PRIMARY KEY AUTO_INCREMENT,
    occasion_id INT,
    topic VARCHAR(200) NOT NULL,
    presenter VARCHAR(100) NOT NULL,
    start_datetime DATETIME NOT NULL,
    end_datetime DATETIME NOT NULL,
    FOREIGN KEY (occasion_id) REFERENCES Occasions(occasion_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- 4. Signups Table (instead of Registrations)
CREATE TABLE Signups (
    signup_id INT PRIMARY KEY AUTO_INCREMENT,
    attendee_id INT,
    occasion_id INT,
    signup_date DATE NOT NULL,
    FOREIGN KEY (attendee_id) REFERENCES Attendees(attendee_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (occasion_id) REFERENCES Occasions(occasion_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- 5. Reviews Table (instead of Feedback)
CREATE TABLE Reviews (
    review_id INT PRIMARY KEY AUTO_INCREMENT,
    attendee_id INT,
    occasion_id INT,
    score INT CHECK (score BETWEEN 1 AND 5),
    remarks TEXT,
    review_date DATE NOT NULL,
    FOREIGN KEY (attendee_id) REFERENCES Attendees(attendee_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (occasion_id) REFERENCES Occasions(occasion_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- 6. Materials Table (instead of Resources)
CREATE TABLE Materials (
    material_id INT PRIMARY KEY AUTO_INCREMENT,
    occasion_id INT,
    material_type ENUM('pdf', 'image', 'link'),
    material_link VARCHAR(255) NOT NULL,
    uploaded_on DATETIME NOT NULL,
    FOREIGN KEY (occasion_id) REFERENCES Occasions(occasion_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
