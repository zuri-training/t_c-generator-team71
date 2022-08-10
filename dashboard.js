const expander = document.querySelector('.sidebar-expander');
const sidebar = document.querySelector('.sidebar');
const aside = document.querySelector('aside');
const openModal = document.querySelector('.modal-wrapper');
const modalOne = document.querySelector('.modal1');
const modalTwo = document.querySelector('.modal2');
const toggler = document.querySelectorAll('.toggler');
const modalOnes = document.querySelectorAll('.modal1-btn');
const modalTwos = document.querySelectorAll('.modal2-btn');
const body = document.querySelector('body');
const innerWrapper = document.querySelector('.inner-wrapper');


// Sidebar Toggler
expander.addEventListener('click', () => {
    sidebar.classList.toggle('sidebar-collapsed');
    aside.classList.toggle('sidebar-collapsed');
})

// Navbar Toggler
toggler.forEach(toggle => {
    toggle.addEventListener('click', () => {
        aside.classList.toggle('navbar-toggler');
    })
})

// New Terms Modal
modalOnes.forEach(modal => {
    modal.addEventListener('click', (e) => {
        modalOne.classList.toggle('modal');
        body.classList.toggle('no-scroll');
        openModal.classList.remove('changes');
        modalTwo.classList.remove('changes');

        const previewCons = document.querySelectorAll('.preview-cons');
        previewCons.forEach(view => {
            if (!view.innerHTML.includes("show-preview")) {
                view.innerHTML = preview;
            }
        })
    })
})

// New Policy Modal
modalTwos.forEach(modal2 => {
    modal2.addEventListener('click', (e) => {
        modalTwo.classList.toggle('modal');
        modalTwo.classList.remove('changes');
        body.classList.toggle('no-scroll');
        openModal.classList.remove('changes');
        const previewCons = document.querySelectorAll('.preview-cons');
        previewCons.forEach(view => {
            if (!view.innerHTML.includes("show-preview")) {
                view.innerHTML = preview;
            }
        })
    })
})


// Business Conditions Details Form
const bizDetails = document.querySelector(".conditions-details");
bizDetails.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(bizDetails);
    const data = Object.fromEntries(formData);
    modalOne.classList.add('add-progress');
    body.classList.toggle('no-scroll');
    document.querySelector('.heading').innerHTML = 'Preview';

    setTimeout(() => {
        modalOne.classList.toggle('modal');
        modalOne.classList.remove('changes');
        modalOne.classList.remove('add-progress');
        modalTwo.classList.remove('changes');

        bizDetails.reset();
    }, 300);
    console.log(data);
})

bizDetails.addEventListener('change', (e) => {
    const formData = new FormData(priDetails);
    const data = Object.fromEntries(formData);
    generatePreviewTemplate(data);
})

// Business Privacy Details Form
const priDetails = document.querySelector(".privacy-details");
priDetails.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(priDetails);
    const data = Object.fromEntries(formData);

    modalTwo.classList.add('add-progress');
    body.classList.toggle('no-scroll');
    document.querySelector('.heading').innerHTML = 'Preview';

    setTimeout(() => {
        modalTwo.classList.toggle('modal');
        modalTwo.classList.remove('changes');
        modalTwo.classList.remove('add-progress');
        priDetails.reset();
        document.querySelectorAll('.preview').forEach(view => {
            view.innerHTML = preview;
        })
    }, 300);
    console.log(data);
})

priDetails.addEventListener('change', (e) => {
    const formData = new FormData(priDetails);
    const data = Object.fromEntries(formData);
    
    let template;

    const sections = {
        'consent': `
<h1>Privacy Policy for eHealth4everyone</h1>

<p>At ${data.business_name}, accessible from ${data.business_url}, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by ${data.business_name} and how we use it.</p>

<p>If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.</p>

<p>This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in ${data.business_name}. This policy is not applicable to any information collected offline or via channels other than this website. Our Privacy Policy was created with the help of the <a href="https://www.privacypolicygenerator.info/">Free Privacy Policy Generator</a>.</p>

<h2>Consent</h2>

<p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>`,

        'info_we_collect': `<h2>Information we collect</h2>

<p>The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.</p>
<p>If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.</p>
<p>When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.</p>`,

        'how_we_use_info': `<h2>How we use your information</h2>

<p>We use the information we collect in various ways, including to:</p>

<ul>
<li>Provide, operate, and maintain our website</li>
<li>Improve, personalize, and expand our website</li>
<li>Understand and analyze how you use our website</li>
<li>Develop new products, services, features, and functionality</li>
<li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
<li>Send you emails</li>
<li>Find and prevent fraud</li>
</ul>`,

        logFiles: `<h2>Log Files</h2>

<p>${data.business_name} follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.</p>`,

        'cookies': `<h2>Cookies and Web Beacons</h2>

<p>Like any other website, ${data.business_name} uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>

<h2>Google DoubleClick DART Cookie</h2>

<p>Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL - <a href="https://policies.google.com/technologies/ads">https://policies.google.com/technologies/ads</a></p>`,

        'advertising_partners': `<h2>Our Advertising Partners</h2>

<p>Some of advertisers on our site may use cookies and web beacons. Our advertising partners are listed below. Each of our advertising partners has their own Privacy Policy for their policies on user data. For easier access, we hyperlinked to their Privacy Policies below.</p>

<ul>
    <li>
        <p>Google</p>
        <p><a href="https://policies.google.com/technologies/ads">https://policies.google.com/technologies/ads</a></p>
    </li>
</ul>

<h2>Advertising Partners Privacy Policies</h2>

<P>You may consult this list to find the Privacy Policy for each of the advertising partners of ${data.business_name}.</p>

<p>Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on ${data.business_name}, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.</p>

<p>Note that ${data.business_name} has no access to or control over these cookies that are used by third-party advertisers.</p>`,

        'third_party': `<h2>Third Party Privacy Policies</h2>

<p>${data.business_name}'s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options. </p>

<p>You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.</p>`,

        'children_information': `<h2>Children's Information</h2>

<p>Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.</p>

<p>${data.business_name} does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.</p>
`
    }

    template = sections.intro // setting the default value of templates to intro

    Object.keys(data).slice(2).forEach((key) => {
        let container = `<div>${sections[key]}</div>` // storing each object property in a div
        template += container // appending the agreement content to template
    })

    innerWrapper.innerHTML = template // display the selected agremment on the page
    return template

})

// Switching Form Content
const switchForms = document.querySelectorAll('.switch-form');
switchForms.forEach(swap => {
    swap.addEventListener('click', () => {
        openModal.classList.toggle('changes');
        openModal.classList.remove('add-progress');
        modalTwo.classList.toggle('changes');
        modalTwo.classList.remove('add-progress');
    })
})

// Tabs Switcher
$(document).ready(function () {
    $('.tab-a').click(function () {
        $(".tab").removeClass('tab-active');
        $(".tab[data-id='" + $(this).attr('data-id') + "']").addClass("tab-active");
        $(".tab-a").removeClass('active-a');
        $(this).parent().find(".tab-a").addClass('active-a');
    });
});

// Preview Template
const preview = `
       <div class="show-preview">
        <h1 class="preview-heading">Preview of yourDocument</h1>
        <div class="preview-wrapper">
            <div class="inner-preview">
            </div>
            <div class="preview-ctas">
                <button class="preview-btn preview-edit">
                    <img src="edit-2.svg" alt="pen icon">
                    Edit
                </button>
                <button class="preview-btn preview-save">
                    <img src="folder-add.svg" alt="folder icon">
                    Save
                </button>
                <div>
                    <button class="preview-btn preview-more" onclick="showMore()">
                        <img src="more.svg" alt="3 black dots  icon stacked on eachother">
                    </button>
                    <div class="more">
                        <button onclick="handleShare()">
                            <img src="share.svg" alt="share icon">
                            Share
                        </button>
                        <button onclick="handleDownload()">
                            <img src="download.svg" alt="download icon">
                            Download
                        </button>
                        <button onclick="handleExport()">
                            <img src="export.svg" alt="export icon">
                            Export
                        </button>
                        <button onclick="handleEmbed()">
                            <img src="embed.svg" alt="embed icon">
                            Embed
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </div>
        `;

//Generate template 
function generatePrivacyTemplate(data) {
    let template;

    const sections = {
        consent: `
<h1>Privacy Policy for eHealth4everyone</h1>

<p>At ${data.business_name}, accessible from ${data.business_url}, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by ${data.business_name} and how we use it.</p>

<p>If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.</p>

<p>This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in ${data.business_name}. This policy is not applicable to any information collected offline or via channels other than this website. Our Privacy Policy was created with the help of the <a href="https://www.privacypolicygenerator.info/">Free Privacy Policy Generator</a>.</p>

<h2>Consent</h2>

<p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>`,

        infoWeCollect: `<h2>Information we collect</h2>

<p>The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.</p>
<p>If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.</p>
<p>When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.</p>`,

        howWeUseInfo: `<h2>How we use your information</h2>

<p>We use the information we collect in various ways, including to:</p>

<ul>
<li>Provide, operate, and maintain our website</li>
<li>Improve, personalize, and expand our website</li>
<li>Understand and analyze how you use our website</li>
<li>Develop new products, services, features, and functionality</li>
<li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
<li>Send you emails</li>
<li>Find and prevent fraud</li>
</ul>`,

        logFiles: `<h2>Log Files</h2>

<p>${data.business_name} follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.</p>`,

        cookies: `<h2>Cookies and Web Beacons</h2>

<p>Like any other website, ${data.business_name} uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>

<h2>Google DoubleClick DART Cookie</h2>

<p>Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads">https://policies.google.com/technologies/ads</a></p>`,

        advertisingPartners: `<h2>Our Advertising Partners</h2>

<p>Some of advertisers on our site may use cookies and web beacons. Our advertising partners are listed below. Each of our advertising partners has their own Privacy Policy for their policies on user data. For easier access, we hyperlinked to their Privacy Policies below.</p>

<ul>
    <li>
        <p>Google</p>
        <p><a href="https://policies.google.com/technologies/ads">https://policies.google.com/technologies/ads</a></p>
    </li>
</ul>

<h2>Advertising Partners Privacy Policies</h2>

<P>You may consult this list to find the Privacy Policy for each of the advertising partners of ${data.business_name}.</p>

<p>Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on ${data.business_name}, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.</p>

<p>Note that ${data.business_name} has no access to or control over these cookies that are used by third-party advertisers.</p>`,

        thirdParties: `<h2>Third Party Privacy Policies</h2>

<p>${data.business_name}'s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options. </p>

<p>You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.</p>`,

        childrenInformation: `<h2>Children's Information</h2>

<p>Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.</p>

<p>${data.business_name} does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.</p>
`
    }

    template = sections.intro // setting the default value of templates to intro

    Object.keys(data).slice(2).forEach((key) => {
        let container = `<div>${sections[key]}</div>` // storing each object property in a div
        template += container // appending the agreement content to template
    })

    innerWrapper.innerHTML = template // display the selected agremment on the page
    return template
}

// More Options Modal
function showMore() {
    const moreOptions = document.querySelector('.more');
    moreOptions.classList.toggle('show-more');
}