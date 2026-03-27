document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const employee = {
                idNumber: document.getElementById('idNumber').value.trim(),
                firstName: document.getElementById('firstName').value.trim(),
                lastName: document.getElementById('lastName').value.trim(),
                gender: document.querySelector('input[name="gender"]:checked') ? document.querySelector('input[name="gender"]:checked').value : '',
                phone: document.getElementById('phone').value.trim(),
                email: document.getElementById('email').value.trim(),
                address: document.getElementById('address').value.trim(),
                dob: document.getElementById('dob').value,
                department: document.getElementById('department').value,
                position: document.getElementById('position').value
            };
            let employees = JSON.parse(localStorage.getItem('employees')) || [];
            employees.push(employee);
            localStorage.setItem('employees', JSON.stringify(employees));
            alert('✅ Employee added successfully!\n\nRedirecting to View All Contacts...');
            setTimeout(() => { window.location.href = 'view-contacts.html'; }, 800);
        });
    }

    const tableBody = document.getElementById('table-body');
    if (tableBody) {
        const modal = document.getElementById('edit-modal');
        const closeBtn = document.querySelector('.close');
        const editForm = document.getElementById('edit-form');
        let currentEditIndex = null;

        function renderTable() {
            let employees = JSON.parse(localStorage.getItem('employees')) || [];
            tableBody.innerHTML = '';
            if (employees.length === 0) {
                tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:40px; color:#777;">No employees yet.<br><strong>Add some from New Contact page!</strong></td></tr>`;
                return;
            }
            employees.forEach((emp, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${emp.firstName} ${emp.lastName}</td>
                    <td>${emp.email}</td>
                    <td>${emp.phone}</td>
                    <td>${emp.department}</td>
                    <td>
                        <button class="action-btn details-btn" data-index="${index}">Details</button>
                        <button class="action-btn edit-btn" data-index="${index}">Edit</button>
                        <button class="action-btn delete-btn" data-index="${index}">Delete</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });

            document.querySelectorAll('.details-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const idx = parseInt(btn.dataset.index);
                    const e = JSON.parse(localStorage.getItem('employees'))[idx];
                    alert(`ID: ${e.idNumber}\nName: ${e.firstName} ${e.lastName}\nGender: ${e.gender}\nPhone: ${e.phone}\nEmail: ${e.email}\nAddress: ${e.address}\nDOB: ${e.dob}\nDepartment: ${e.department}\nPosition: ${e.position}`);
                });
            });

            document.querySelectorAll('.edit-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    currentEditIndex = parseInt(btn.dataset.index);
                    const employees = JSON.parse(localStorage.getItem('employees'));
                    const e = employees[currentEditIndex];
                    document.getElementById('edit-idNumber').value = e.idNumber;
                    document.getElementById('edit-firstName').value = e.firstName;
                    document.getElementById('edit-lastName').value = e.lastName;
                    document.getElementById('edit-gender').value = e.gender;
                    document.getElementById('edit-phone').value = e.phone;
                    document.getElementById('edit-email').value = e.email;
                    document.getElementById('edit-address').value = e.address;
                    document.getElementById('edit-dob').value = e.dob;
                    document.getElementById('edit-department').value = e.department;
                    document.getElementById('edit-position').value = e.position;
                    modal.style.display = 'flex';
                });
            });

            document.querySelectorAll('.delete-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    if (confirm('Are you sure you want to delete this employee?')) {
                        let employees = JSON.parse(localStorage.getItem('employees'));
                        employees.splice(parseInt(btn.dataset.index), 1);
                        localStorage.setItem('employees', JSON.stringify(employees));
                        renderTable();
                    }
                });
            });
        }

        if (editForm) {
            editForm.addEventListener('submit', (e) => {
                e.preventDefault();
                let employees = JSON.parse(localStorage.getItem('employees'));
                const emp = employees[currentEditIndex];
                emp.firstName = document.getElementById('edit-firstName').value;
                emp.lastName = document.getElementById('edit-lastName').value;
                emp.gender = document.getElementById('edit-gender').value;
                emp.phone = document.getElementById('edit-phone').value;
                emp.email = document.getElementById('edit-email').value;
                emp.address = document.getElementById('edit-address').value;
                emp.dob = document.getElementById('edit-dob').value;
                emp.department = document.getElementById('edit-department').value;
                emp.position = document.getElementById('edit-position').value;
                localStorage.setItem('employees', JSON.stringify(employees));
                modal.style.display = 'none';
                renderTable();
                alert('✅ Employee updated successfully!');
            });
        }

        if (closeBtn) closeBtn.addEventListener('click', () => modal.style.display = 'none');
        window.addEventListener('click', (e) => {
            if (e.target === modal) modal.style.display = 'none';
        });

        renderTable();
    }
});