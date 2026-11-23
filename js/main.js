// Ereteti Dairy Sacco — js/main.js
// Lab 3: form check, routes filter and accepted total.
// Every listener is wrapped in an if guard, because this one file is
// linked from all six pages and most elements exist on only one page.

// Block 1 — the litres check (built in class)
const litres = document.getElementById('litres');
const litresMessage = document.getElementById('litres-message');

function checkLitres() {
  if (litres.value === '') {
    litresMessage.textContent = '';
    litres.classList.remove('invalid');
    return false;
  }
  const amount = Number(litres.value);
  if (amount <= 0) {
    litresMessage.textContent = 'Litres must be more than 0.';
    litres.classList.add('invalid');
    return false;
  }
  if (amount > 60) {
    litresMessage.textContent = 'Over 60 litres in one session. Check the reading.';
    litres.classList.add('invalid');
    return false;
  }
  litresMessage.textContent = '';
  litres.classList.remove('invalid');
  return true;
}

if (litres) {
  litres.addEventListener('input', checkLitres);
}

// Block 2 — the member-number check (built in class)
const member = document.getElementById('member');
const memberMessage = document.getElementById('member-message');

function checkMember() {
  if (member.value === '') {
    memberMessage.textContent = '';
    member.classList.remove('invalid');
    return false;
  }
  if (!/^ER-[0-9]{4}$/.test(member.value)) {
    memberMessage.textContent = 'Member numbers look like ER-0001.';
    member.classList.add('invalid');
    return false;
  }
  memberMessage.textContent = '';
  member.classList.remove('invalid');
  return true;
}

if (member) {
  member.addEventListener('blur', checkMember);
}

// Block 3 (Step 3) — the form check on deliveries.php
const deliveryForm = document.getElementById('delivery-form');
const formMessage = document.getElementById('form-message');

if (deliveryForm) {
  deliveryForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // normalise the member number the clerk typed, e.g. er-0001 → ER-0001
    member.value = member.value.toUpperCase();

    const memberOk = checkMember();
    const litresOk = checkLitres();

    if (!memberOk || !litresOk) {
      if (!memberOk) {
        member.focus();
      } else {
        litres.focus();
      }
      formMessage.textContent = 'Check the form and try again.';
      return;
    }

    formMessage.textContent = 'Checked: ' + member.value + ', ' + litres.value
      + ' litres. Delivery recorded.';
    deliveryForm.reset();
  });
}

// Block 4 (Step 4) — the routes filter on routes.php
const routeSearch = document.getElementById('route-search');
const routeCount = document.getElementById('route-count');
const routeSections = document.querySelectorAll('.route-section');

function showRoutes(visible) {
  if (routeCount) {
    routeCount.textContent = visible + ' of ' + routeSections.length + ' routes';
  }
}

if (routeSearch) {
  routeSearch.addEventListener('input', function () {
    const query = routeSearch.value.toLowerCase();
    let visible = 0;
    for (const section of routeSections) {
      const matches = section.textContent.toLowerCase().includes(query);
      section.style.display = matches ? '' : 'none';
      if (matches) {
        visible++;
      }
    }
    showRoutes(visible);
  });
}

const routeButtons = document.querySelectorAll('.route-button');

function filterRoutes(route) {
  let visible = 0;
  for (const section of routeSections) {
    const heading = section.querySelector('h2');
    const matches = route === 'All' || heading.textContent.startsWith(route);
    section.style.display = matches ? '' : 'none';
    if (matches) {
      visible++;
    }
  }
  showRoutes(visible);
}

if (routeButtons.length > 0) {
  for (const button of routeButtons) {
    button.addEventListener('click', function () {
      filterRoutes(button.dataset.route);
    });
  }
}

// Block 5 (Step 5) — the accepted total on deliveries.php
const acceptedTotalCell = document.getElementById('accepted-total');

if (acceptedTotalCell) {
  const rows = document.querySelectorAll('#deliveries-table tbody tr');
  let total = 0;
  for (const row of rows) {
    const cells = row.querySelectorAll('td');
    if (cells[4].textContent === 'Yes') {
      total += Number(cells[3].textContent);
    }
  }
  acceptedTotalCell.textContent = total.toFixed(2);
}
