INSERT INTO Users (user_id, full_name, email, city, registration_date) VALUES
(1, 'Emily Roberts', 'emilyr@example.com', 'San Francisco', '2025-01-10'),
(2, 'James Carter', 'jamesc@example.com', 'Seattle', '2025-01-15'),
(3, 'Sophia Brown', 'sophiab@example.com', 'Austin', '2025-01-20'),
(4, 'Michael Davis', 'miked@example.com', 'San Francisco', '2025-02-05'),
(5, 'Olivia Wilson', 'oliviaw@example.com', 'Seattle', '2025-02-20');

INSERT INTO Events (event_id, title, description, city, start_date, end_date, status, organizer_id) VALUES
(1, 'Cloud Computing Summit', 'A summit for cloud computing professionals.', 'San Francisco', '2025-09-15 09:00:00', '2025-09-15 17:00:00', 'upcoming', 1),
(2, 'Data Science Expo', 'Explore latest trends in data science.', 'Austin', '2025-08-10 08:30:00', '2025-08-10 16:30:00', 'completed', 3),
(3, 'Mobile App Workshop', 'Learn app development from scratch.', 'Seattle', '2025-10-05 09:30:00', '2025-10-07 17:00:00', 'upcoming', 2);

INSERT INTO Sessions (session_id, event_id, title, speaker_name, start_time, end_time) VALUES
(1, 1, 'Welcome and Overview', 'Dr. Cloud', '2025-09-15 09:00:00', '2025-09-15 10:00:00'),
(2, 1, 'Kubernetes Deep Dive', 'Emily Roberts', '2025-09-15 10:15:00', '2025-09-15 12:00:00'),
(3, 2, 'Machine Learning Applications', 'Sophia Brown', '2025-08-10 09:00:00', '2025-08-10 10:30:00'),
(4, 3, 'React Native Basics', 'James Carter', '2025-10-05 09:30:00', '2025-10-05 11:30:00');

INSERT INTO Registrations (registration_id, user_id, event_id, registration_date) VALUES
(1, 1, 1, '2025-08-01'),
(2, 2, 1, '2025-08-02'),
(3, 3, 2, '2025-07-28'),
(4, 4, 2, '2025-07-25'),
(5, 5, 3, '2025-09-15');

INSERT INTO Feedback (feedback_id, user_id, event_id, rating, comments, feedback_date) VALUES
(1, 3, 2, 5, 'Excellent sessions!', '2025-08-11'),
(2, 4, 2, 4, 'Very useful information.', '2025-08-11'),
(3, 2, 1, 3, 'Good but could improve.', '2025-09-16');

INSERT INTO Resources (resource_id, event_id, resource_type, resource_url, uploaded_at) VALUES
(1, 2, 'pdf', 'https://eventsportal.com/resources/cloud_summit_schedule.pdf', '2025-08-01 09:00:00'),
(2, 2, 'image', 'https://eventsportal.com/resources/ds_expo_banner.jpg', '2025-07-20 08:30:00'),
(3, 3, 'link', 'https://eventsportal.com/resources/mobile_dev_tutorials', '2025-09-30 14:00:00');
