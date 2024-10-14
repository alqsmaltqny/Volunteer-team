// form
let members = [];

// Fetch and display members on initial load
async function fetchMembers() {
    members = JSON.parse(localStorage.getItem('members')) || [];
    displayMembers();
}

// Add new member
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const newMember = {
        id: Date.now(), // Unique ID
        name,
        email,
        message
    };
    alert('تم التسجيل بنجاح!');

    members.push(newMember);
    localStorage.setItem('members', JSON.stringify(members));
    displayMembers();

    // إعادة تحميل الصفحة
    window.location.reload();
});


// On document ready
document.addEventListener('DOMContentLoaded', function() {
    fetchMembers();
});

// إنشاء عنصر HTML لكل عضو
function createMemberElement(member) {
    const memberDiv = document.createElement('div');
    memberDiv.className = 'member';
    memberDiv.innerHTML = `
        <div class="message">Message: ${member.message}</div>
        <div class="email">Email: ${member.email}</div>
        <span>Name: ${member.name}</span>
        <div class="buttons">
            <button onclick="acceptMember('${member.email}')">قبول</button>
            <button class="reject" onclick="rejectMember(this)">حذف</button>
        </div>
    `;
    return memberDiv;
}

// عرض الأعضاء عند تحميل الصفحة
function displayMembers() {
    const membersList = document.getElementById('membersList');
    members.forEach(member => {
        const memberElement = createMemberElement(member);
        membersList.appendChild(memberElement);
    });
}

// التفاعل مع زر القبول
function acceptMember(email) {
    window.location.href = `mailto:${email}`;
}

// التفاعل مع زر الرفض
function rejectMember(buttonElement) {
    // العثور على العنصر الذي يحتوي على زر الحذف
    const memberDiv = buttonElement.parentElement.parentElement;
    const email = memberDiv.querySelector('.email').textContent.replace('Email: ', '');

    // إزالة العنصر من DOM
    memberDiv.remove();

    // حذف العضو من قائمة الأعضاء في الذاكرة
    members = members.filter(member => member.email !== email);

    // تحديث localStorage
    localStorage.setItem('members', JSON.stringify(members));
}

// عرض الأعضاء عند تحميل الصفحة
displayMembers();


//contact

function openMailClient() {
    const email = 'abadaaldmshki123@gmail.com';
    const subject = 'موضوع الرسالة';
    const body = 'نص الرسالة';
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}



//activities

document.addEventListener('DOMContentLoaded', function() {
    fetch('activities.json')
        .then(response => response.json())
        .then(data => {
            // تخزين البيانات في Local Storage
            localStorage.setItem('activities', JSON.stringify(data));

            // تحديث الصفحة بالمحتوى
            const activitiesContainer = document.querySelector('.activities');
            activitiesContainer.innerHTML = data.map(activity => `
                <div class="activity-card">
                    <a href="details.html?id=${activity.id}">
                        <img src="${activity.image}" alt="${activity.title}">
                        <h2>${activity.title}</h2>
                        <p>${activity.description}</p>
                    </a>
                </div>
            `).join('');
        })
        .catch(error => console.error('Error fetching data:', error));
});

// details

document.addEventListener('DOMContentLoaded', function() {
    // استرجاع الأنشطة من Local Storage
    const activities = JSON.parse(localStorage.getItem('activities'));

    // الحصول على معرف النشاط من رابط الصفحة
    const urlParams = new URLSearchParams(window.location.search);
    const activityId = parseInt(urlParams.get('id'), 10);

    // العثور على النشاط المناسب
    const activity = activities.find(a => a.id === activityId);

    if (activity) {
        document.getElementById('activity-title').textContent = activity.title;
        document.getElementById('activity-description').textContent = activity.description;
        document.getElementById('activity-image').src = activity.image;
    } else {
        document.getElementById('activity-details').innerHTML = '<p>لا توجد تفاصيل لهذا النشاط.</p>';
    }
});