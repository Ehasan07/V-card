document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('vcard-form');
    const previewName = document.getElementById('preview-name');
    const previewTitle = document.getElementById('preview-title');
    const previewCompany = document.getElementById('preview-company');
    const previewAvatar = document.getElementById('preview-avatar');
    const downloadVcfButton = document.getElementById('download-vcf');
    const shareQrButton = document.getElementById('share-qr');
    const qrCodeContainer = document.getElementById('qr-code');
    const copyQrLinkButton = document.getElementById('copy-qr-link');

    form.addEventListener('input', function (e) {
        const { id, value } = e.target;
        const previewElement = document.getElementById(`preview-${id}`);
        if (previewElement) {
            previewElement.textContent = value;
        }
    });

    document.getElementById('avatar').addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                previewAvatar.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    downloadVcfButton.addEventListener('click', function () {
        const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${form.name.value}
ORG:${form.company.value}
TITLE:${form.title.value}
EMAIL:${form.email.value}
TEL:${form.phone.value}
ADR:${form.address.value}
BDAY:${form.birthday.value}
URL:${form.website.value}
NOTE:${form.notes.value}
END:VCARD`;
        const blob = new Blob([vcard], { type: 'text/vcard' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'contact.vcf';
        a.click();
        URL.revokeObjectURL(url);
    });

    const qrCodeBox = document.getElementById('qr-code-box');

    shareQrButton.addEventListener('click', function () {
        const googleContactsUrl = `https://contacts.google.com/new?name=${encodeURIComponent(form.name.value)}&company=${encodeURIComponent(form.company.value)}&job_title=${encodeURIComponent(form.title.value)}&email=${encodeURIComponent(form.email.value)}&phone=${encodeURIComponent(form.phone.value)}&address=${encodeURIComponent(form.address.value)}&birthday=${encodeURIComponent(form.birthday.value)}&website=${encodeURIComponent(form.website.value)}&notes=${encodeURIComponent(form.notes.value)}`;
        qrCodeContainer.innerHTML = '';
        new QRCode(qrCodeContainer, {
            text: googleContactsUrl,
            width: 256,
            height: 256,
        });
        qrCodeBox.style.display = 'block';
    });

    copyQrLinkButton.addEventListener('click', function () {
        const googleContactsUrl = `https://contacts.google.com/new?name=${encodeURIComponent(form.name.value)}&company=${encodeURIComponent(form.company.value)}&job_title=${encodeURIComponent(form.title.value)}&email=${encodeURIComponent(form.email.value)}&phone=${encodeURIComponent(form.phone.value)}&address=${encodeURIComponent(form.address.value)}&birthday=${encodeURIComponent(form.birthday.value)}&website=${encodeURIComponent(form.website.value)}&notes=${encodeURIComponent(form.notes.value)}`;
        navigator.clipboard.writeText(googleContactsUrl).then(() => {
            alert('QR link copied to clipboard!');
        });
    });

    const tooltips = new bootstrap.Tooltip(document.body, {
        selector: '[data-bs-toggle="tooltip"]',
    });
});