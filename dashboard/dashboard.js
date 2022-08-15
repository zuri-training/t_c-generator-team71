const expander = document.querySelector('.sidebar-expander');
const sidebar = document.querySelector('.sidebar');
const aside = document.querySelector('aside');
const openModal = document.querySelector('.modal-wrapper');
const modalOne = document.querySelector('.modal1');
const modalTwo = document.querySelector('.modal2');
const toggler = document.querySelectorAll('.toggler');
const modalOnes = document.querySelector('.modal1-btn');
const modalTwos = document.querySelector('.modal2-btn');
const body = document.querySelector('body');
const previewWrapper = document.querySelector('.preview');
const baseUrl = 'https://termbuddy.herokuapp.com/api';
const forms = document.querySelectorAll('form');
let termsObj = {};
let privacyObj = {};
let downloadObj;
let singlePrivacyObj = {};
let singleTermsObj = {};


const wrapper = document.querySelector(".wrapper");
wrapper.addEventListener('click', (e) => {
    const id = e.target.getAttribute('data-id')
    const docName = e.target.getAttribute('data-bar')
    if (e.target.id === 'download') {
        if (e.target.closest('.terms-c')) {
            handleDownload(termsObj)
        } else if (e.target.closest('.privacy-p')) {
            handleDownload(privacyObj)
        }
    }
    if (e.target.classList.contains('delete')) {
        const docId = e.target.getAttribute('data-id');
        const cate = e.target.getAttribute('data-category')
        let category;
        if (cate === 'terms') {
            category = 'terms-and-conditions';
            deleteDoc(docId, category)
        } else if (cate === 'privacy') {
            category = 'privacy-policies';
            deleteDoc(docId, category)
        }
    }

})
const previewCons = document.querySelector(".preview-cons");
previewCons.addEventListener('click', (e) => {
    if (e.target.classList.contains('docu-prim')) {
        const id = e.target.getAttribute('data-id')
        const docName = e.target.getAttribute('data-bar')
        openPreview(id, docName);
    }
})

const docWrapper = document.querySelector('.doc-wrapper');
docWrapper.addEventListener('click', (e) => { 
    if (e.target.id === 'download') {
        handleDownload(downloadObj)
    }
})

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

// Toggle Document Form Modal
modalOnes.addEventListener('click', () => {
    modalOne.classList.toggle('modal');
    body.classList.toggle('no-scroll');
    modalTwo.classList.toggle('changes');
    openModal.classList.toggle('changes');
    previewWrapper.innerHTML = mainContent;
    location.reload();
})

modalTwos.addEventListener('click', () => {
    modalTwo.classList.remove('modal');
    body.classList.toggle('no-scroll');
    modalTwo.classList.toggle('changes');
    openModal.classList.toggle('changes');
    previewWrapper.innerHTML = mainContent;
    location.reload();

})

// New Terms Modal
function termModal() {
    modalOne.classList.toggle('modal');
    body.classList.toggle('no-scroll');
    openModal.classList.remove('changes');
    modalTwo.classList.remove('changes');
}

// New Policy Modal
function privacyModal() {
    modalTwo.classList.toggle('modal');
    modalTwo.classList.remove('changes');
    body.classList.toggle('no-scroll');
}

// Business Conditions Details Form
const bizDetails = document.querySelector(".conditions-details");
bizDetails.addEventListener('submit', (e) => {
    e.preventDefault();
    const sendTo = `${baseUrl}/terms-and-conditions/create/`;
    const formData = new FormData(bizDetails);
    // formData.append('permanent', false);
    let data = Object.fromEntries(formData);
    data.permanent = false
    termsObj = data;
    termsObj.name = 'terms';
    document.querySelector('.inner-preview').innerHTML = generateTermsTemplate(data);
    document.querySelector('.preview-ctas').classList.add('terms-c');
    const doc = "terms"
    handleSave(data, sendTo, doc)
})

// Business Privacy Details Form
const priDetails = document.querySelector(".privacy-details");
priDetails.addEventListener('submit', (e) => {
    e.preventDefault();
    const sendTo = `${baseUrl}/privacy-policies/create/`;
    const formData = new FormData(priDetails);
    // formData.append('permanent', false);
    let data = Object.fromEntries(formData);
    data.permanent = false
    privacyObj = data;
    privacyObj.name = 'privacy';
    document.querySelector('.inner-preview').innerHTML = generatePrivacyTemplate(data);
    document.querySelector('.preview-ctas').classList.add('privacy-p');
    const doc = "privacy"
    handleSave(data, sendTo, doc);
})

// Switching Form Content
const switchForms = document.querySelectorAll('.switch-form');
switchForms.forEach(swap => {
    swap.addEventListener('click', () => {
        openModal.classList.toggle('changes');
        openModal.classList.remove('add-progress');
        modalTwo.classList.toggle('changes');
        modalTwo.classList.remove('add-progress');
        previewWrapper.innerHTML = preview;
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

// Main Dashboard Content
const mainContent = `
<div class="dash-pt">
                            <div class="terms">
                                <h2>Terms and Conditions</h2>
                                <div class="terms-wrapper">
                                    <button class="docu-btn modal1-btn terms-btn" onclick="termModal()">
                                        <div>
                                            <img src="plus.svg" alt="plus icon">
                                        </div>
                                        <p> <img src="file.svg" alt="file icon">New</p>
                                    </button>
                                </div>
                            </div>
                            <div class="privacy">
                                <h2>Privacy Policy</h2>
                                <div class="privacy-wrapper">
                                    <button class="docu-btn modal2-btn privacy-btn" onclick="privacyModal()">
                                        <img src="plus.svg" alt="plus icon">
                                        <p><img src="policy.svg" alt="file icon">New</p>
                                    </button>
                                </div>
                            </div>
                        </div>
`;
// Default dashboard view
previewWrapper.innerHTML = mainContent;

// Preview Before Save Template
const preview = `
       <div class="show-preview">
        <h1 class="preview-heading">Preview of your document</h1>
        <div class="preview-wrapper">
            <div class="inner-preview">

            </div>
            <div class="preview-ctas">
                <button class="preview-btn preview-save add-one" onclick="handleAdd()">
                    <img src="folder-add.svg" alt="folder icon">
                    Save
                </button>
                <button class="preview-btn preview-save add-two" onclick="handleAddTwo()">
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
                        <button id="download">
                            <img src="download.svg" alt="download icon">
                            Download
                        </button>
                        <button class="export" onclick="handleExport()">
                            <img src="export.svg" alt="export icon">
                            Export
                        </button>
                        <button onclick="handleEmbed()">
                            <img src="embed.svg" alt="embed icon">
                            Embed
                        </button>
                        <div class="export-as">
                        </div>
                    </div>
                </div>

            </div>
            <button class="preview-btn preview-cls" onclick="handleExit()">
                <img src="cls.svg" alt="pen icon">
                Exit
        </button>
        </div>
    </div>
        `;

// Preview After Save Template
let oPreview;
const previewAfter = `
       <div class="show-preview">
        <h1 class="preview-heading">Preview of your document</h1>
        <div class="preview-wrapper">
            <div class="inner-preview open-preview">     
            </div>
            <div class="preview-ctas">
                <div>
                    <button class="preview-btn preview-more" onclick="showMore()">
                        <img src="more.svg" alt="3 black dots  icon stacked on eachother">
                    </button>
                    <div class="more">
                        <button onclick="handleShare()">
                            <img src="share.svg" alt="share icon">
                            Share
                        </button>
                        <button id="download">
                            <img src="download.svg" alt="download icon">
                            Download
                        </button>
                        <button class="export" onclick="handleExport()">
                            <img src="export.svg" alt="export icon">
                            Export
                        </button>
                        <button onclick="handleEmbed()">
                            <img src="embed.svg" alt="embed icon">
                            Embed
                        </button>
                        <div class="export-as">
                        </div>
                    </div>
                </div>

            </div>
            <button class="preview-btn preview-cls" onclick="closePreview()">
                <img src="cls.svg" alt="pen icon">
                Exit
        </button>
        </div>
    </div>
        `;

//Generate Terms template 
function generateTermsTemplate(data) {
    // storing the agreement content in an object
    const sections = {
        'intro': `
            <h1>Terms and conditions for ${data.business_name}</h1>

            <p>At ${data.business_name}, accessible from ${`<a href="${data.business_url}">${data.business_url}</a>`}, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by ${data.business_url} and how we use it.</p>

            <p>If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.</p>

            <p>This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in ${data.business_name}. This policy is not applicable to any information collected offline or via channels other than this website. Our Privacy Policy was created with the help of the <a href="https://${data.business_name}.io/">${data.business_name}</a>.</p>

            <h2>Consent</h2>

            <p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>

            <h2>Information we collect</h2>

            <p>The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.</p>
            <p>If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.</p>
            <p>When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.</p>

            <h2>How we use your information</h2>

            <p>We use the information we collect in various ways, including to:</p>

            <ul>
                <li> - Provide, operate, and maintain our website</li>
                <li> - Improve, personalize, and expand our website</li>
                <li> - Understand and analyze how you use our website</li>
                <li> - Develop new products, services, features, and functionality</li>
                <li> - Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
                <li> - Send you emails</li>
                <li> - Find and prevent fraud</li>
            </ul>`,

        'cookies': `
            <h2>Cookies</h2>
            
            <p>
                We employ the use of cookies. By accessing Website Name, you agreed to use cookies
                in agreement with the Company Name's Privacy Policy.
            </p>

            <p>
                Most interactive websites use cookies to let us retrieve the user's details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.
            </p>
        `,
        'licenses': `
            <h2><strong>License</strong></h2>

            <p>Unless otherwise stated, ${data.business_name} and/or its licensors own the intellectual property rights for all material on ${data.business_name}. All intellectual property rights are reserved. You may access this from ${data.business_name} for your own personal use subjected to restrictions set in these terms and conditions.</p>

            <p>You must not:</p>
            <ul>
                <li> -  Republish material from ${data.business_name}</li>
                <li> -  Sell, rent or sub-license material from ${data.business_name}</li>
                <li> -  Reproduce, duplicate or copy material from ${data.business_name}</li>
                <li> -  Redistribute content from ${data.business_name}</li>
            </ul>

            <p>This Agreement shall begin on the date hereof. Our Terms and Conditions were created with the help of <a href="https://${data.business_name}.io/">${data.business_name}</a>.</p>

            <p>Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. ${data.business_name} does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of ${data.business_name},its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, ${data.business_name} shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.</p>

            <p>${data.business_name} reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.</p>

            <p>You warrant and represent that:</p>

            <ul>
                <li> -  You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;</li>
                <li> -  The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;</li>
                <li> -  The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy</li>
                <li> -  The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.</li>
            </ul>

            <p>You hereby grant a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.</p>
        `,
        'iframes': `
            <h2><strong>iFrames</strong></h2>

            <p>Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.</p>
        `,
        'content_liability': `
            <h2><strong>Content Liability</strong></h2>

            <p>We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.</p>
        `,
        'disclaimer': `
            <h2><strong>Disclaimer</strong></h2>

            <p>To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:</p>

            <ul>
                <li> -  limit or exclude our or your liability for death or personal injury;</li>
                <li> -  limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
                <li> -  limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
                <li> -  exclude any of our or your liabilities that may not be excluded under applicable law.</li>
            </ul>

            <p>The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.</p>

            <p>As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.</p>
        `,

    }

    template = sections.intro // setting the default value of templates to intro

    Object.keys(data).slice(5, -2).forEach((key) => {
        let container = `<div>${sections[key]}</div>` // storing each object property in a div
        template += container // appending the agreement content to template
    })

    // display the selected agremment on the page
    return template
}

//Generate Privacy template 
function generatePrivacyTemplate(data) {
    let template;

    const sections = {
        intro: `
<h1>Privacy Policy for ${data.business_name}</h1>

<p>At ${data.business_name}, accessible from ${`<a href="${data.business_url}"> ${data.business_url}</a>`}, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by ${data.business_name} and how we use it.</p>

<p>If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.</p>

<p>This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in ${data.business_name}. This policy is not applicable to any information collected offline or via channels other than this website. Our Privacy Policy was created with the help of the <a href="https://${data.business_name}.io/">${data.business_name}</a>.</p>

<h2>Consent</h2>

<p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>`,

        info_we_collect: `<h2>Information we collect</h2>

<p>The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.</p>
<p>If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.</p>
<p>When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.</p>`,

        how_we_use_info: `<h2>How we use your information</h2>

<p>We use the information we collect in various ways, including to:</p>

<ul>
<li> - Provide, operate, and maintain our website</li>
<li> - Improve, personalize, and expand our website</li>
<li> - Understand and analyze how you use our website</li>
<li> - Develop new products, services, features, and functionality</li>
<li> - Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
<li> - Send you emails</li>
<li> - Find and prevent fraud</li>
</ul>`,

        cookies: `<h2>Cookies and Web Beacons</h2>

<p>Like any other website, ${data.business_name} uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>

<h2>Google DoubleClick DART Cookie</h2>

<p>Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL - <a href="https://policies.google.com/technologies/ads">https://policies.google.com/technologies/ads</a></p>`,

        advertising_partners: `<h2>Our Advertising Partners</h2>

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

        third_parties: `<h2>Third Party Privacy Policies</h2>

<p>${data.business_name}'s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options. </p>

<p>You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.</p>`,

        children_information: `<h2>Children's Information</h2>

<p>Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.</p>

<p>${data.business_name} does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.</p>
`
    }

    template = sections.intro // setting the default value of templates to intro

    Object.keys(data).slice(6, -2).forEach((key) => {
        let container = `<div>${sections[key]}</div>` // storing each object property in a div
        template += container // appending the agreement content to template
    })

    // display the selected agremment on the page
    return template
}

function handleExit() {
    previewWrapper.innerHTML = mainContent;
    priDetails.reset();
    bizDetails.reset();
}

// Saving And Pushing User Data To Database
let tokenAccess = JSON.parse(localStorage.getItem('credentials'))

function handleSave(formObject, endpoint, doc) {
    const access = tokenAccess.access;
    fetch(`${endpoint}`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${access}`
        },
        body: JSON.stringify(formObject)
    }).then(res => {
        // if (!res.ok) {
        //     throw new Error(res.statusText)
        // }
        return res.json()
    }).then(data => {
        localStorage.setItem('doc-id', data.id)
        doc === "terms" ? postTermsSave() : postPrivacySave()
    })
        .catch(error => {
            console.log(error)
            return false;
        })
}

// Adding Data To Dashboard
function handleAdd() {
    let tokenAccess = JSON.parse(localStorage.getItem('credentials'))
    const formData = new FormData(bizDetails);
    formData.append('permanent', true);
    const access = tokenAccess.access;
    const data = Object.fromEntries(formData);
    fetch(`${baseUrl}/terms-and-conditions/${localStorage.getItem('doc-id')}/update/`, {
        method: 'PUT',
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${access}`
        },
        body: JSON.stringify(data)
    }).then(res => {
        if (!res.ok) {
            throw new Error(res.statusText)
        }
        return res.json()
    }).then(data => {
        previewWrapper.innerHTML = mainContent;
        localStorage.removeItem('doc-id')
        location.reload();
    }).catch(error => console.log(error));
}

function handleAddTwo() {
    let tokenAccess = JSON.parse(localStorage.getItem('credentials'))
    const formData = new FormData(priDetails);
    formData.append('permanent', true);
    const access = tokenAccess.access;
    const data = Object.fromEntries(formData);
    fetch(`${baseUrl}/privacy-policies/${localStorage.getItem('doc-id')}/update/`, {
        method: 'PUT',
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${access}`
        },
        body: JSON.stringify(data)
    }).then(res => {
        if (!res.ok) {
            throw new Error(res.statusText)
        }
        return res.json()
    }).then(data => {
        previewWrapper.innerHTML = mainContent;
        localStorage.removeItem('doc-id')
        location.reload();
    }).catch(error => console.log(error));
}

// More Options Modal
function showMore() {
    const moreOptions = document.querySelector('.more');
    moreOptions.classList.toggle('show-more');
    const showExport = document.querySelector('.export-as');
    showExport.classList.remove('show-export');
}

// Downloading Document Created
const specialElementHandlers = {
    '#hidden-element': function (element, renderer) {
        return true;
    }
};
const downloadTemplate = (template) => {
    const doc = new jsPDF();
    doc.fromHTML(template, 20, 20, {
        'width': 170,
        'elementHandlers': specialElementHandlers,
    })
    doc.save(`Document.pdf`)
}

// Downloading Document Created
function handleDownload(data) {

    const finishedTemplate = data.name === "terms" ? generateTermsTemplate(data) : generatePrivacyTemplate(data)
    downloadTemplate(finishedTemplate)
    const moreOptions = document.querySelector('.more');
    moreOptions.classList.toggle('show-more');
}

// Exporting Document Created
function handleExport() {
    const showExport = document.querySelector('.export-as');
    showExport.classList.toggle('show-export');
    showExport.innerHTML = `<div class="exports">
                            <p>Export as</p>
                            <button onclick="docxFormat()">DOCX</button>
                            <button onclick="txtFormat()">TXT</button>
                            <button onclick="htmlFormat()">HTML</button>
                        </div>`
}

// Exporting as DOCX
function docxFormat() {
    const showExport = document.querySelector('.export-as');
    showExport.classList.toggle('show-export');

    // getting the inner-preview container and add an id attribute to it
    let innerPreview = document.querySelector('.inner-preview');
    innerPreview.setAttribute('id', 'preview-container')

    // constructing the source data with the header, body and footer tags
    let header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
        "xmlns:w='urn:schemas-microsoft-com:office:word' " +
        "xmlns='http://www.w3.org/TR/REC-html40'>" +
        "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
    let footer = "</body></html>";
    let previewContainer = header + document.getElementById('preview-container').innerHTML + footer;

    // encoding previewContainer to form a URL
    let source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(previewContainer);

    // creating a download link
    let anchorElement = document.createElement('a');
    document.body.appendChild(anchorElement);
    anchorElement.href = source;
    anchorElement.download = 'Document.doc';
    anchorElement.click();
    document.body.removeChild(anchorElement);
}

// Exporting as TXT
function txtFormat() {
    const showExport = document.querySelector('.export-as');
    showExport.classList.toggle('show-export');

        // create an empty array that will contain the content in inner-preview
        let arrayOfInnerPreviewContent = []
        // storing the text of inner preview in a variable
        let innerPreviewContent = document.querySelector('.inner-preview').innerText
        // pushing the content previewed to the array
        arrayOfInnerPreviewContent.push(innerPreviewContent)
        //  converting the array to a string
        let arrayToString = arrayOfInnerPreviewContent.toString()
        // converting the content to a text file
        let file = new Blob([arrayToString], { type: 'text' })
        // creating a link to download the text file
        let anchorTag = document.createElement('a')
        anchorTag.href = URL.createObjectURL(file)
        anchorTag.download = 'Document.txt'  // name of file to be changed
        anchorTag.click()
}

// Exporting as HTML
function htmlFormat() {
    const showExport = document.querySelector('.export-as');
    showExport.classList.toggle('show-export');
}

// Sharing Document Created
function handleShare() {
    const showExport = document.querySelector('.export-as');
    showExport.classList.toggle('show-export');
    showExport.style.left = '-20.2rem';
    showExport.style.top = '0';

    showExport.innerHTML = `<div class="embed-link">
                                <small>Copy this link to share the document</small>
                                <button onclick="share()">Document</but>
                            </div>`;
}

function share() {
    const showExport = document.querySelector('.export-as');
    showExport.classList.toggle('show-export');
}

// Embeding Document Created
function handleEmbed() {
    const showExport = document.querySelector('.export-as');
    showExport.classList.toggle('show-export');
    showExport.classList.toggle('show-embed');
    showExport.innerHTML = `<textarea>${oPreview}
    </textarea>`
}

// Previewing Generated and Saved Document
document.querySelectorAll('.doc-toggle').forEach(doc => {
    doc.addEventListener('click', () => {
        document.querySelector('.doc-wrapper').classList.toggle('show-doc');
        document.querySelector('.inner-doc').innerHTML = previewAfter;
    })
})

function closePreview() {
    document.querySelector('.doc-wrapper').classList.toggle('show-doc');
}

// LogOut
function logOut() {
    localStorage.removeItem('credentials');
    localStorage.removeItem('fname')
    localStorage.removeItem('lname')
    localStorage.removeItem('email')
    window.location.href = 'https://zuri-training.github.io/t_c-generator-team71/login.html';
}

window.addEventListener('DOMContentLoaded', () => {
    const tokenAccess = JSON.parse(localStorage.getItem('credentials'))
    if (tokenAccess) {
        // location.reload();
        handleDisplay();
        handleGetUser();
    } else {
        window.location.href = 'https://zuri-training.github.io/t_c-generator-team71/login.html';
    }
})

// Get user details
function handleGetUser() {
    let tokens = JSON.parse(localStorage.getItem('credentials'));
    fetch(`${baseUrl}/users/${tokens.id}/`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${tokens.access}`
        }
    }).then(res => {
        return res.json()
    }).then(data => {
        localStorage.setItem('fname', data.first_name)
        localStorage.setItem('lname', data.last_name)
        localStorage.setItem('email', data.email)
    }).catch(error => console.log(error));
    let x = localStorage.getItem('fname');
    let y = localStorage.getItem('lname');
    document.querySelector('.num-figure').innerHTML = `${localStorage.getItem('email')}`;
    document.querySelector('.name').innerHTML = `${x} ${y}`;
    document.querySelectorAll('.initials').forEach(initial => {
        initial.innerHTML = `${x[0]}${y[0]}`;
    })
}

// Displaying All Documents user has created
const pWrapper = document.querySelectorAll('.privacy-wrapper')
const tWrapper = document.querySelectorAll('.terms-wrapper')

function handleDisplay() {
    let tokenAccess = JSON.parse(localStorage.getItem('credentials'))
    fetch(`${baseUrl}/users/${tokenAccess.id}/documents`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${tokenAccess.access}`
        }
    }).then(res => {
        return res.json()
    }).then(data => {
        privacyDocs = data.privacy_policies;
        privacyDocs.forEach(pd => {
            pd.name = "privacy"
            oPreview = generatePrivacyTemplate(pd);
            pWrapper.forEach(wrapper => {
                wrapper.innerHTML += renderDocuments(pd);
            })
        })

        termsDocs = data.terms;
        termsDocs.forEach(td => {
            td.name = "terms"
            tWrapper.forEach(wrapper => {
                wrapper.innerHTML += renderDocuments(td);
            })
        })
    }).catch(error => console.log(error));
}


// Get Individual Document
const renderDocuments = (document) => {
    const dashboard = `<div>
    <button data-category=${document.name} class="thrash delete" data-id=${document.id}><img class="delete" src="../images/trash.svg" data-category=${document.name} data-id=${document.id}></button>
    <p>${document.document_name}</p>
<button class="docu-btn docu-primary docu-prim" data-id=${document.id} data-bar=${document.name}>
    <div>
        <img class="docu-prim" data-id=${document.id} data-bar=${document.name} src="docu-image.png" alt="an image of a document">
    </div>
    <div>
        <p class="docu-prim" data-id=${document.id} data-bar=${document.name}>
            <img src="eye.svg" class="docu-prim" data-id=${document.id} data-bar=${document.name} alt="an eye icon">Preview
        </p>
    </div>
</button>
</div>
    </div>`

    return dashboard
}

// Previewing Individual Document
function openPreview(docId, docName) {
    const docType = (docName === "terms") ? "terms-and-conditions" : "privacy-policies";
    document.querySelector('.doc-wrapper').classList.toggle('show-doc');
    document.querySelector('.inner-doc').innerHTML = previewAfter;
    fetch(`${baseUrl}/${docType}/${docId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${tokenAccess.access}`
        }
    }).then(res => {

        return res.json()
    }).then(data => {
        let mutateData = data;
        delete mutateData.permanent;
        delete mutateData.user_id;
        delete mutateData.id;
        delete mutateData.additional_text;
        delete mutateData.create_date;
        delete mutateData.last_edit;
        if (docName === "terms") {
            termsObj = mutateData
            downloadObj = termsObj
            downloadObj.name = "terms"
        } else {
            privacyObj = mutateData
            downloadObj = privacyObj
        }

        document.querySelector('.inner-preview').innerHTML = docName === "terms" ? generateTermsTemplate(mutateData) : generatePrivacyTemplate(mutateData);
    })
}

function deleteDoc(id, docCate) {
    fetch(`${baseUrl}/${docCate}/${id}/delete`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${tokenAccess.access}`
        }
    }).then(res => {
        return res.status;
    }).then(data => {
        location.reload();
    }).catch(error => console.log(error));
}


function postTermsSave() {
    modalOne.classList.add('add-progress');
    body.classList.toggle('no-scroll');
    document.querySelector('.heading').innerHTML = 'Preview';
    if (openModal.classList.contains('modal1')) {
        document.querySelector('.add-two').style.display = 'none';
        document.querySelector('.add-one').style.display = 'block';
    }

    setTimeout(() => {
        modalOne.classList.toggle('modal');
        modalOne.classList.remove('changes');
        modalOne.classList.remove('add-progress');
        modalTwo.classList.remove('changes');
    }, 300);
}

function postPrivacySave() {

    modalTwo.classList.add('add-progress');
    body.classList.toggle('no-scroll');
    document.querySelector('.heading').innerHTML = 'Preview';
    if (!openModal.classList.contains('modal2')) {
        document.querySelector('.add-one').style.display = 'none';
        document.querySelector('.add-two').style.display = 'block';
    }

    setTimeout(() => {
        modalTwo.classList.toggle('modal');
        modalTwo.classList.remove('changes');
        modalTwo.classList.remove('add-progress');
    }, 300);
}