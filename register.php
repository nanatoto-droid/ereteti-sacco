<?php
$page_title = 'Apply for membership';
include 'includes/header.php';
?>

  <main>
    <p>Any farmer on one of our three routes may apply to join. You will need a national ID and a bank account. You can deliver from the day your membership number is issued.</p>

    <form action="process-register.php" method="post">
      <fieldset>
        <legend>Your details</legend>

        <label for="first-name">First name</label>
        <input type="text" id="first-name" name="first_name" required>

        <label for="last-name">Last name</label>
        <input type="text" id="last-name" name="last_name" required>

        <label for="national-id">National ID</label>
        <input type="text" id="national-id" name="national_id" required>

        <label for="phone">Phone</label>
        <input type="tel" id="phone" name="phone" pattern="07[0-9]{8}" title="Ten digits, starting 07" placeholder="07XXXXXXXX" required>
      </fieldset>

      <fieldset>
        <legend>Your route</legend>

        <label for="route">Route</label>
        <select id="route" name="route" required>
          <option value=""></option>
          <option value="1">Kiserian route</option>
          <option value="2">Ngong route</option>
          <option value="3">Rongai route</option>
        </select>

        <label for="date-joined">Date joined</label>
        <input type="date" id="date-joined" name="date_joined" max="2026-09-24" required>

        <label for="rules">
          <input type="checkbox" id="rules" name="rules" required>
          I agree to the sacco rules
        </label>
      </fieldset>

      <button type="submit">Apply to join</button>
    </form>
  </main>

<?php include 'includes/footer.php'; ?>
