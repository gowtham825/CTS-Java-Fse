USE Event_Planner;

-- 1. User Upcoming Events
-- Show a list of all upcoming events a user is registered for in their city, sorted by date.
SELECT o.*
FROM Occasions o
JOIN Signups s ON o.occasion_id = s.occasion_id
JOIN Attendees a ON s.attendee_id = a.attendee_id
WHERE o.event_status = 'upcoming'
  AND a.location = o.venue_city
  AND a.attendee_id = ? -- Replace ? with the user ID
ORDER BY o.begin_datetime;

-- 2. Top Rated Events
-- Identify events with the highest average rating, considering only those that have received at least 10 feedback submissions.
SELECT o.occasion_id, o.event_name, AVG(r.score) AS avg_rating, COUNT(r.review_id) AS feedback_count
FROM Occasions o
JOIN Reviews r ON o.occasion_id = r.occasion_id
GROUP BY o.occasion_id
HAVING COUNT(r.review_id) >= 10
ORDER BY avg_rating DESC;

-- 3. Inactive Users
-- Retrieve users who have not registered for any events in the last 90 days.
SELECT a.*
FROM Attendees a
LEFT JOIN Signups s ON a.attendee_id = s.attendee_id AND s.signup_date >= CURDATE() - INTERVAL 90 DAY
WHERE s.signup_id IS NULL;

-- 4. Peak Session Hours
-- Count how many sessions are scheduled between 10 AM to 12 PM for each event.
SELECT t.occasion_id, o.event_name, COUNT(*) AS sessions_10_to_12
FROM Talks t
JOIN Occasions o ON t.occasion_id = o.occasion_id
WHERE TIME(t.start_datetime) >= '10:00:00' AND TIME(t.end_datetime) <= '12:00:00'
GROUP BY t.occasion_id;

-- 5. Most Active Cities
-- List the top 5 cities with the highest number of distinct user registrations.
SELECT a.location, COUNT(DISTINCT s.attendee_id) AS distinct_registrations
FROM Attendees a
JOIN Signups s ON a.attendee_id = s.attendee_id
GROUP BY a.location
ORDER BY distinct_registrations DESC
LIMIT 5;

-- 6. Event Resource Summary
-- Generate a report showing the number of resources (PDFs, images, links) uploaded for each event.
SELECT o.occasion_id, o.event_name,
       SUM(CASE WHEN m.material_type = 'pdf' THEN 1 ELSE 0 END) AS pdf_count,
       SUM(CASE WHEN m.material_type = 'image' THEN 1 ELSE 0 END) AS image_count,
       SUM(CASE WHEN m.material_type = 'link' THEN 1 ELSE 0 END) AS link_count
FROM Occasions o
LEFT JOIN Materials m ON o.occasion_id = m.occasion_id
GROUP BY o.occasion_id;

-- 7. Low Feedback Alerts
-- List all users who gave feedback with a rating less than 3, along with their comments and associated event names.
SELECT a.attendee_id, a.name, r.score, r.remarks, o.event_name
FROM Reviews r
JOIN Attendees a ON r.attendee_id = a.attendee_id
JOIN Occasions o ON r.occasion_id = o.occasion_id
WHERE r.score < 3;

-- 8. Sessions per Upcoming Event
-- Display all upcoming events with the count of sessions scheduled for them.
SELECT o.occasion_id, o.event_name, COUNT(t.talk_id) AS session_count
FROM Occasions o
LEFT JOIN Talks t ON o.occasion_id = t.occasion_id
WHERE o.event_status = 'upcoming'
GROUP BY o.occasion_id;

-- 9. Organizer Event Summary
-- For each event organizer, show the number of events created and their current status (upcoming, completed, cancelled).
SELECT a.attendee_id, a.name, 
       SUM(CASE WHEN o.event_status = 'upcoming' THEN 1 ELSE 0 END) AS upcoming_count,
       SUM(CASE WHEN o.event_status = 'completed' THEN 1 ELSE 0 END) AS completed_count,
       SUM(CASE WHEN o.event_status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled_count,
       COUNT(o.occasion_id) AS total_events
FROM Attendees a
LEFT JOIN Occasions o ON a.attendee_id = o.host_id
GROUP BY a.attendee_id;

-- 10. Feedback Gap
-- Identify events that had registrations but received no feedback at all.
SELECT o.occasion_id, o.event_name
FROM Occasions o
JOIN Signups s ON o.occasion_id = s.occasion_id
LEFT JOIN Reviews r ON o.occasion_id = r.occasion_id
GROUP BY o.occasion_id
HAVING COUNT(r.review_id) = 0;

-- 11. Daily New User Count
-- Find the number of users who registered each day in the last 7 days.
SELECT signup_date, COUNT(*) AS new_users
FROM Attendees
WHERE registration_date >= CURDATE() - INTERVAL 7 DAY
GROUP BY registration_date
ORDER BY registration_date DESC;

-- 12. Event with Maximum Sessions
-- List the event(s) with the highest number of sessions.
SELECT o.occasion_id, o.event_name, COUNT(t.talk_id) AS session_count
FROM Occasions o
JOIN Talks t ON o.occasion_id = t.occasion_id
GROUP BY o.occasion_id
ORDER BY session_count DESC
LIMIT 1;

-- 13. Average Rating per City
-- Calculate the average feedback rating of events conducted in each city.
SELECT o.venue_city, AVG(r.score) AS avg_rating
FROM Occasions o
JOIN Reviews r ON o.occasion_id = r.occasion_id
GROUP BY o.venue_city;

-- 14. Most Registered Events
-- List top 3 events based on the total number of user registrations.
SELECT o.occasion_id, o.event_name, COUNT(s.signup_id) AS total_registrations
FROM Occasions o
JOIN Signups s ON o.occasion_id = s.occasion_id
GROUP BY o.occasion_id
ORDER BY total_registrations DESC
LIMIT 3;

-- 15. Event Session Time Conflict
-- Identify overlapping sessions within the same event (i.e., session start and end times that conflict).
SELECT t1.occasion_id, o.event_name, t1.talk_id AS talk1_id, t2.talk_id AS talk2_id
FROM Talks t1
JOIN Talks t2 ON t1.occasion_id = t2.occasion_id
  AND t1.talk_id < t2.talk_id
  AND t1.start_datetime < t2.end_datetime
  AND t2.start_datetime < t1.end_datetime
JOIN Occasions o ON t1.occasion_id = o.occasion_id
ORDER BY t1.occasion_id;

-- 16. Unregistered Active Users
-- Find users who created an account in the last 30 days but haven’t registered for any events.
SELECT a.*
FROM Attendees a
LEFT JOIN Signups s ON a.attendee_id = s.attendee_id
WHERE a.registration_date >= CURDATE() - INTERVAL 30 DAY
  AND s.signup_id IS NULL;

-- 17. Multi-Session Speakers
-- Identify speakers who are handling more than one session across all events.
SELECT speaker_name, COUNT(*) AS session_count
FROM Talks
GROUP BY speaker_name
HAVING session_count > 1;

-- 18. Resource Availability Check
-- List all events that do not have any resources uploaded.
SELECT o.occasion_id, o.event_name
FROM Occasions o
LEFT JOIN Materials m ON o.occasion_id = m.occasion_id
WHERE m.material_id IS NULL;

-- 19. Completed Events with Feedback Summary
-- For completed events, show total registrations and average feedback rating.
SELECT o.occasion_id, o.event_name,
       COUNT(DISTINCT s.signup_id) AS total_registrations,
       AVG(r.score) AS avg_feedback_rating
FROM Occasions o
LEFT JOIN Signups s ON o.occasion_id = s.occasion_id
LEFT JOIN Reviews r ON o.occasion_id = r.occasion_id
WHERE o.event_status = 'completed'
GROUP BY o.occasion_id;

-- 20. User Engagement Index
-- For each user, calculate how many events they attended and how many feedbacks they submitted.
SELECT a.attendee_id, a.name,
       COUNT(DISTINCT s.occasion_id) AS events_attended,
       COUNT(DISTINCT r.review_id) AS feedback_submitted
FROM Attendees a
LEFT JOIN Signups s ON a.attendee_id = s.attendee_id
LEFT JOIN Reviews r ON a.attendee_id = r.attendee_id
GROUP BY a.attendee_id;

-- 21. Top Feedback Providers
-- List top 5 users who have submitted the most feedback entries.
SELECT a.attendee_id, a.name, COUNT(r.review_id) AS feedback_count
FROM Attendees a
JOIN Reviews r ON a.attendee_id = r.attendee_id
GROUP BY a.attendee_id
ORDER BY feedback_count DESC
LIMIT 5;

-- 22. Duplicate Registrations Check
-- Detect if a user has been registered more than once for the same event.
SELECT attendee_id, occasion_id, COUNT(*) AS registration_count
FROM Signups
GROUP BY attendee_id, occasion_id
HAVING registration_count > 1;

-- 23. Registration Trends
-- Show a month-wise registration count trend over the past 12 months.
SELECT DATE_FORMAT(signup_date, '%Y-%m') AS year_month, COUNT(*) AS registrations
FROM Signups
WHERE signup_date >= CURDATE() - INTERVAL 12 MONTH
GROUP BY year_month
ORDER BY year_month;

-- 24. Average Session Duration per Event
-- Compute the average duration (in minutes) of sessions in each event.
SELECT t.occasion_id, o.event_name,
       AVG(TIMESTAMPDIFF(MINUTE, t.start_datetime, t.end_datetime)) AS avg_session_duration_minutes
FROM Talks t
JOIN Occasions o ON t.occasion_id = o.occasion_id
GROUP BY t.occasion_id;

-- 25. Events Without Sessions
-- List all events that currently have no sessions scheduled under them.
SELECT o.occasion_id, o.event_name
FROM Occasions o
LEFT JOIN Talks t ON o.occasion_id = t.occasion_id
WHERE t.talk_id IS NULL;
