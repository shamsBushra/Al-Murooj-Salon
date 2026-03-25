document.addEventListener('DOMContentLoaded', () => {
    // 1. تأثير الظهور المتتالي عند فتح الصفحة (Entrance Animation)
    const cards = document.querySelectorAll('.grid-card, .juice-card, .coffee-item, .item-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index); // يظهر كل كرت بعد الآخر بـ 100 ملي ثانية
    });

    // 2. تفعيل أزرار التنقل (Navigation Tabs)
    const navItems = document.querySelectorAll('.nav-item, .tab-btn, .cat-pill, .cat-link');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // منع السلوك الافتراضي إذا كان رابطاً داخلياً
            if(this.getAttribute('href') === "#") e.preventDefault();
            
            // إزالة الحالة النشطة من الجميع وإضافتها للمضغطوع عليه
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');

            // إضافة اهتزاز خفيف للهاتف (Haptic Feedback Simulation)
            if (window.navigator.vibrate) window.navigator.vibrate(10);
        });
    });

    // 3. تفاعل أزرار الإضافة (+) مع تأثير "النبض"
    const addButtons = document.querySelectorAll('.add-btn, .add-icon, .add-to-cart');
    addButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // تأثير بصري سريع للزر
            this.style.transform = 'scale(0.8)';
            setTimeout(() => this.style.transform = 'scale(1)', 100);

            // زيادة رقم السلة إذا وجد
            const cartBadge = document.querySelector('.cart-dot, .count-badge');
            if(cartBadge) {
                let count = parseInt(cartBadge.innerText) || 0;
                cartBadge.innerText = count + 1;
                cartBadge.style.display = 'block';
                
                // أنميشن للسلة عند الإضافة
                cartBadge.animate([
                    { transform: 'scale(1)' },
                    { transform: 'scale(1.5)' },
                    { transform: 'scale(1)' }
                ], { duration: 300 });
            }

            // إظهار رسالة تأكيد (Toast)
            showModernToast("تمت الإضافة بنجاح ✨");
        });
    });

    // 4. وظيفة رسائل التنبيه العائمة (Toast)
    function showModernToast(text) {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed; bottom: 100px; left: 50%; transform: translateX(-50%);
            background: rgba(0,0,0,0.8); color: white; padding: 12px 25px;
            border-radius: 50px; font-size: 0.9rem; z-index: 9999;
            backdrop-filter: blur(5px); transition: all 0.4s; opacity: 0;
        `;
        toast.innerText = text;
        document.body.appendChild(toast);
        
        setTimeout(() => { toast.style.opacity = '1'; toast.style.bottom = '110px'; }, 100);
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 400);
        }, 2000);
    }

    // 5. تأثير التمرير السلس (Smooth Scroll) للأقسام
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});