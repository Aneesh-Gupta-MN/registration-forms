<?php
declare(strict_types=1);

$courses = [
    'B.Tech - Computer Science',
    'B.Tech - Information Technology',
    'BCA',
    'MCA',
    'B.Sc - Computer Science',
    'Other',
];

$genders = ['Female', 'Male', 'Non-binary', 'Prefer not to say'];
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Student registration form built with PHP">
  <title>Student Registration Form</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <header>
    <div class="header-inner">
      <a class="brand" href="#register"><span class="logo">SR</span><span>Student Registration</span></a>
      <nav><a href="#register">Registration Form</a><a href="#records">View Records</a></nav>
    </div>
  </header>

  <main>
    <section class="form-card" id="register">
      <div class="card-header">
        <h1>Student Registration Form</h1>
        <p>Please fill in the form below to register a student. All fields are required.</p>
      </div>
      <div id="message" role="status"></div>

      <form id="registrationForm">
        <fieldset>
          <legend>Personal Information</legend>
          <div class="fields">
            <label for="fullName">Full Name <span>*</span><input id="fullName" maxlength="80" placeholder="Enter full name" required></label>
            <label for="dob">Date of Birth <span>*</span><input id="dob" type="date" required></label>
            <label for="gender">Gender <span>*</span>
              <select id="gender" required>
                <option value="">-- Select Gender --</option>
                <?php foreach ($genders as $gender): ?>
                  <option value="<?= htmlspecialchars($gender, ENT_QUOTES, 'UTF-8') ?>"><?= htmlspecialchars($gender, ENT_QUOTES, 'UTF-8') ?></option>
                <?php endforeach; ?>
              </select>
            </label>
          </div>
        </fieldset>

        <fieldset>
          <legend>Contact Information</legend>
          <div class="fields two-columns">
            <label for="email">Email Address <span>*</span><input id="email" type="email" maxlength="120" placeholder="Enter email address" required></label>
            <label for="phone">Phone Number <span>*</span><input id="phone" type="tel" pattern="[0-9+() -]{7,18}" placeholder="Enter phone number" required></label>
          </div>
        </fieldset>

        <fieldset>
          <legend>Academic Information</legend>
          <div class="fields one-column">
            <label for="course">Course <span>*</span>
              <select id="course" required>
                <option value="">-- Select Course --</option>
                <?php foreach ($courses as $course): ?>
                  <option value="<?= htmlspecialchars($course, ENT_QUOTES, 'UTF-8') ?>"><?= htmlspecialchars($course, ENT_QUOTES, 'UTF-8') ?></option>
                <?php endforeach; ?>
              </select>
            </label>
          </div>
        </fieldset>

        <div class="form-actions"><button type="reset" class="reset">Reset</button><button type="submit" class="submit">Submit Registration</button></div>
      </form>
    </section>

    <section class="records-card" id="records">
      <div class="records-header"><div><h2>Registered Students</h2><p>Student records saved in this browser.</p></div><span class="count"><b id="totalTop">0</b> total</span></div>
      <div class="search"><span>⌕</span><input id="searchInput" aria-label="Search records" placeholder="Search student records..."><span class="record-total"><b id="totalBadge">0</b> records</span></div>
      <div class="table-box">
        <table><thead><tr><th>Student</th><th>Contact</th><th>Course</th><th>Gender</th><th>Registered</th><th>Action</th></tr></thead><tbody id="recordsBody"></tbody></table>
        <div id="emptyState" class="empty"><div>👤</div><h3>No student records</h3><p>Complete the registration form to add a student.</p></div>
      </div>
    </section>
  </main>

  <footer>Web Technology Lab Project &nbsp;|&nbsp; PHP Student Registration System</footer>
  <script src="/script.js"></script>
</body>
</html>
