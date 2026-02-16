document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');

    if (form) {
        const inputs = form.querySelectorAll('input[required], textarea[required]');

        // Validate on blur
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                validateInput(input);
            });

            input.addEventListener('input', () => {
                if (input.closest('.form-group').classList.contains('error')) {
                    validateInput(input);
                }
            });
        });

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            let isValid = true;
            inputs.forEach(input => {
                if (!validateInput(input)) {
                    isValid = false;
                }
            });

            if (isValid) {
                // Mock submission
                alert('ご予約・お問い合わせありがとうございます。\n内容を確認後、担当者よりご連絡いたします。');
                form.reset();
            } else {
                // Scroll to first error
                const firstError = form.querySelector('.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }

    function validateInput(input) {
        const formGroup = input.closest('.form-group');
        let valid = true;

        if (input.value.trim() === '') {
            valid = false;
        } else if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            valid = emailRegex.test(input.value);
        } else if (input.type === 'tel') {
            const telRegex = /^[0-9-]{10,13}$/;
            valid = telRegex.test(input.value);
        }

        if (valid) {
            formGroup.classList.remove('error');
        } else {
            formGroup.classList.add('error');
        }

        return valid;
    }

    // Pre-select menu if query param exists (e.g., ?menu=basic)
    const urlParams = new URLSearchParams(window.location.search);
    const menuParam = urlParams.get('menu');

    if (menuParam) {
        const menuSelect = document.getElementById('menu');
        if (menuSelect) {
            menuSelect.value = menuParam;
        }
    }
});
