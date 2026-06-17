import type { ContentPagesDoc } from './content-pages.types';

const ABOUT_BODY = `<p>Super Free Bingo is an independent bingo comparison site, founded in 2006. We are operated by Little Star Media, who also operate our sister site, Super Free Slot Games.</p>
<p>At Super Free Bingo you're in safe hands, as our well-established bingo comparison portal has been nominated several times for the EGR Bingo Affiliate of the Year award and, to ensure that our customers have a first class experience, we only work with UK licensed brands.</p>
<p>We're here to make finding the right bingo bonus deal as simple as possible, so we gather top deals from quality bingo brands on one fantastic site.</p>
<p>Super Free Bingo is regularly updated with the latest offers from new sites, as well as old favourites. We work hard to secure brilliant bonuses, many of which are enhanced deals, giving you more than the standard welcome offers on each site.</p>
<p>To help you along the way, we offer bingo site reviews and handy step-by-step guides to make it easier to choose from the wide variety of deals on offer. We can also send all the latest offers and exclusives direct to you if you sign up to receive regular emails and SMS updates.</p>
<p>We're here to help make sure your gaming experience doesn't involve any hard work, just smart play, so we find the latest free and generous deposit bingo offers for you, as well as exclusive deals that give you more than the standard offer available at each site.</p>
<p>So if you want to get started, all you have to do is choose from one of our huge selection of bingo offers and click to claim your bingo bonus!</p>`;

const DISCLAIMER_BODY = `<p>The information contained in this website is for general information purposes only. The information is provided by Super Free Bingo and whilst we endeavour to keep the information up-to-date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.</p>
<p>In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.</p>
<p>Through this website you are able to link to other websites which are not under the control of Super Free Bingo. We have no control over the nature, content and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.</p>
<p>Any links to third party sites (including bingo sites) are provided for your convenience to provide further information. We have no responsibility for the content of linked website(s). It is your responsibility to make yourself familiar with the terms and conditions and play rules operated by those third parties.</p>
<p>Please note that where third party sites offer 'free bingo' or 'free play' schemes, they will be subject to the rules of the particular site operator. There may be restrictions upon how you can use and/or withdraw any sums or winnings from 'free bingo' or 'free play' schemes. Such schemes may only apply to new, first time players. Rules vary from scheme to scheme and you should check the terms and conditions and scheme rules appearing on the particular third party website. If in doubt, you should contact customer support for the relevant site operator.</p>
<p>Every effort is made to keep the website up and running smoothly. However, Super Free Bingo takes no responsibility for, and will not be liable for, the website being temporarily unavailable due to technical issues beyond our control.</p>`;

const TERMS_BODY = `<p>This website is not for use by those under the age of 18 years and/or those living outside the UK. If you are over 18 and live in the UK, you are welcome to use our website.</p>
<p>If you browse and use this website you are agreeing to comply with and be bound by the following terms and conditions of use which, together with our disclaimer, copyright notice and privacy policy, govern Super Free Bingo's relationship with you in relation to this website.</p>
<p>The term 'Super Free Bingo' or 'us' or 'we' refers to the owner of the website whose registered office is Little Star Media Ltd, Exchange House, 450 Midsummer Boulevard, Milton Keynes, MK9 2EA.</p>
<p>The term 'you' refers to the user or viewer of our website.</p>
<ul>
<li>By signing up to the Super Free Bingo website (entering your name, email address and/or mobile number), you agree to receive marketing communications from Super Free Bingo and their associated websites, including emails and SMS messages.</li>
<li>The content of the pages of this website is for your general information and use only. It is subject to change without notice.</li>
<li>Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.</li>
<li>Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through this website meet your specific requirements.</li>
<li>This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.</li>
<li>All trademarks reproduced in this website, which are not the property of, or licensed to the operator, are acknowledged on the website.</li>
<li>Unauthorised use of this website may give to a claim for damages and/or be a criminal offence.</li>
<li>This website includes links to other websites, including bingo sites operated by third parties. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of linked website(s). It is your responsibility to make yourself familiar with the terms and conditions and play rules operated by those third parties.</li>
<li>Please note that where third party sites offer 'free bingo' or 'free play' schemes, they will be subject to the rules of the particular site operator. There may be restrictions upon how you can use and/or withdraw any sums or winnings from 'free bingo' or 'free play' schemes. Such schemes may only apply to new, first time players. Rules vary from scheme to scheme and you should check the terms and conditions and scheme rules appearing on the particular third party website. If in doubt, you should contact customer support for the relevant site operator.</li>
<li>The offers that are shown within our advertising and communications may not appear or may differ from those on site, according to which device you are browsing on, e.g. mobile, desktop or tablet.</li>
<li>You may not create a link to this website from another website or document without Super Free Bingo's prior written consent.</li>
<li>Your use of this website and any dispute arising out of such use of the website is subject to the laws of England and Wales.</li>
</ul>
<p>Little Star Media is registered under the Data Protection Act 2018. Registration Number Z1426156. We comply with UK GDPR.</p>
<p>For more information, please read our Privacy Policy and Disclaimer.</p>`;

const PRIVACY_BODY = `<h2>1. Introduction</h2>
<p>We are committed to protecting your personal data. This privacy policy ("Policy") will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights as a subscribed customer and website user under the General Data Protection Regulation 2016/679 ("GDPR").</p>
<p>We may change this policy from time to time by updating this page.</p>
<p>The Super Free Bingo website is not intended for use by those under the age of 18 years and/or those living outside the UK. We do not knowingly collect data relating to children.</p>
<h2>2. Contact Details</h2>
<p>Little Star Media Limited and It's a Good Choice Ltd are the data controllers and are responsible for your personal data (collectively referred to as the "Company", "we", "us" or "our" in this Policy). This means that we are responsible for deciding how we hold and use personal information about you. Little Star Media Limited is a company registered in the United Kingdom with company number 5957310. It's a Good Choice Ltd is a company registered in the United Kingdom with company number 16175846. Both registered offices are at Suite 478-480, Exchange House, 450 Midsummer Boulevard, Milton Keynes, MK9 2EA.</p>
<p>We have appointed a data protection officer ("DPO"), Caroline Sugrue. The DPO is responsible for overseeing the implementation of this Policy and for monitoring compliance with the GDPR and other applicable data protection legislation. If you have any questions about this Policy, including any requests to exercise your legal rights, please contact the DPO at: privacy@littlestarmedia.com</p>
<p>You have the right to make a complaint at any time to the Information Commissioner's Office (ICO), the UK supervisory authority for data protection issues (www.ico.org.uk). We would, however, appreciate the chance to deal with your concerns before you approach the ICO so please contact us in the first instance. We will always work hard to resolve any concern you may have.</p>
<h2>3. Your Rights</h2>
<p>Under data protection legislation, you have rights we need to make you aware of. The GDPR sets out the following rights applicable to you (please refer to the parts of this policy indicated for further details):</p>
<ul>
<li>3.1 The right to be informed (Part 9);</li>
<li>3.2 The right of access (Part 10);</li>
<li>3.3 The right to rectification (Part 11);</li>
<li>3.4 The right to erasure (also known as the 'right to be forgotten') (Part 12);</li>
<li>3.5 The right to opt out (Part 13);</li>
<li>3.6 The right to restrict processing (Part 14);</li>
<li>3.7 The right to data portability (Part 15); and</li>
<li>3.8 The right to object (Part 16).</li>
</ul>
<p>If you wish to exercise any of the rights set out above, please contact our DPO.</p>
<h2>4. The Data We Collect About You</h2>
<p>The GDPR defines "personal data" as any information relating to an identified or identifiable natural person; an identifiable natural person is one who can be identified, directly or indirectly, in particular by reference to an identifier such as a name, an identification number, location data, an online identifier, or to one or more factors specific to the physical, physiological, genetic, mental, economic, cultural, or social identity of that natural person. It does not include data where the identity has been removed.</p>
<table>
<thead>
<tr><th>Type of Data</th><th>Purpose of Data</th><th>Lawful Basis</th></tr>
</thead>
<tbody>
<tr><td>Identity Data including: name, user name or similar identifier, title, gender</td><td>To identify you as a user so that we can provide services to you and communicate with you in connection with your registration at the Super Free Bingo website.</td><td>Consent</td></tr>
<tr><td>Contact Data including: Email Address, Mobile Phone Number</td><td>We email gambling offers and newsletters to users who have consented to receive these. Users will normally receive emails up to 5 times per week, but on occasion this could be up to 6 times per week. Users may receive gambling offers and site information by SMS if they have consented to receive these. We will use contact information to update you about changes to our policies and terms and conditions. We also share your personal data with Facebook who help us show you relevant content and find similar users who might be interested in our services.</td><td>Consent. Necessary to comply with a legal obligation.</td></tr>
<tr><td>IP Address</td><td>Used as a factor to determine robot behaviour and detect malicious or suspicious software.</td><td>Necessary for our legitimate interests which is to ensure our website is not used by machine learning tools or other non-human actors.</td></tr>
<tr><td>Geographic Location</td><td>Used to determine fraudulent robot behaviour and to detect whether you are eligible to use our website.</td><td>Necessary for our legitimate interests which is to ensure our website is not used by machine learning tools or other non-human actors.</td></tr>
<tr><td>Technical Data including: Device Screen Size, Device Type, Browser Information, Preferred Language</td><td>We use Hotjar and Google Analytics in order to better understand our users' needs and to optimise this service and experience. These tools use cookies and other technologies to collect data on our users' behaviour and their devices. A cookie helps us, for example, to analyse web traffic or lets us know when you visit a particular site.</td><td>Consent. Necessary for our legitimate interests for the provision of administration and IT services and to study how users use our products.</td></tr>
<tr><td>Analytics Data</td><td>We use analytics data to improve our website, products/services, marketing, and user experience.</td><td>Necessary for our legitimate interests (to study how users use our products, to develop them, to grow our business, and to inform our marketing strategy).</td></tr>
</tbody>
</table>
<p>We do not collect any special categories of personal data about you (this includes details about your race or ethnicity, religious or philosophical beliefs, sex life, sexual orientation, political opinions, trade union membership, information about your health, and genetic and biometric data). Nor do we collect any information about criminal convictions and offences.</p>
<p>We collect and process the personal data set out above in the following ways:</p>
<ul>
<li>4.1 directly from you for example through correspondence with you, creation of an account, subscriptions and use of our website;</li>
<li>4.2 via software, automated technologies or interactions with our website (we collect data using cookies and other similar technologies); and</li>
<li>4.3 via third parties.</li>
</ul>
<p>You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly.</p>
<h2>5. How We Use Your Personal Data</h2>
<p>We will only use your personal data when the law allows us to do so. Most commonly, we will use your personal information in the following circumstances:</p>
<ul>
<li>5.1.1 you have given consent to the processing of your personal data for one or more specific purposes;</li>
<li>5.1.2 where we need to perform the contract we have entered into with you;</li>
<li>5.1.3 for compliance with a legal obligation;</li>
<li>5.1.4 to protect your interests (or someone else's interests); or</li>
<li>5.1.5 for our legitimate interests (or those of a third party), except where such interests are overridden by your fundamental rights and freedoms.</li>
</ul>
<p>We may share your personal data with third parties and the third parties to whom we may choose to sell, transfer or merge parts of our business or our assets. We require all third parties to respect the security of your personal data and to treat it in accordance with the law.</p>
<h2>6. Accuracy of Data and Keeping Data Up-to-Date</h2>
<p>It is important that the personal data we hold about you is accurate and current. Please keep us informed if your personal data changes during your relationship with us. You have the right to request the rectification of personal data that we hold about you, as set out in Part 11, below.</p>
<h2>7. Data Retention</h2>
<p>We shall not keep your personal data for any longer than is necessary in light of the purpose or purposes for which that personal data was originally collected, held, and processed. We may retain your personal data for a longer period in the event of a complaint or if we reasonably believe there is a prospect of litigation in respect to our relationship with you.</p>
<p>If you are an active user, we will retain your personal data for the entire time that you are actively engaging with our site or products and for a further period of 6 months from the date of your last engagement. After that you will become an inactive user and we will put you onto a soft suppression list for a period of 2 years, following which we will erase your details.</p>
<p>If you require any information or have any data requests, you can contact our DPO, Caroline Sugrue, at: privacy@littlestarmedia.com</p>
<h2>8. Secure Processing</h2>
<p>We have put in place appropriate security measures to prevent your personal data against unauthorised or unlawful processing and against accidental loss, destruction, or damage. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.</p>
<p>We have put in place procedures to deal with any suspected personal data breach and will notify you and any applicable regulator of a breach where we are legally required to do so.</p>
<h2>9. Keeping You Informed</h2>
<p>Where your personal data is collected directly from you, you will be informed of its purpose at the time of collection.</p>
<h2>10. Your Access Requests</h2>
<p>You may make subject access requests ("SARs") at any time to find out more about the personal data which we hold about you and to check that we are lawfully processing it. If you wish to make a SAR, you should do so by emailing our DPO at privacy@littlestarmedia.com</p>
<h2>11. Rectification of Personal Data</h2>
<p>You have the right to require us to rectify any of your personal data that is inaccurate or incomplete.</p>
<h2>12. Erasure of Personal Data</h2>
<p>You have the right to request that we erase your personal data in certain circumstances, for example where it is no longer necessary for us to process your personal data for the purpose(s) for which it was originally collected.</p>
<h2>13. Marketing Communications</h2>
<p>You can withdraw your consent to receiving marketing communications from us at any time by unsubscribing from our database. If you wish to unsubscribe, please click the 'Unsubscribe' link in any email that you have received from us.</p>
<h2>14. Restriction of Personal Data Processing</h2>
<p>You may request that we cease processing the personal data we hold about you. If you make such a request, we shall retain only the amount of your personal data (if any) that is necessary to ensure that the personal data in question is not processed further.</p>
<h2>15. Data Portability</h2>
<p>Where you have given your consent to us to process your personal data in such a manner, or the data is otherwise required for the performance of a contract between us, you have the right, under the GDPR, to request that we transfer your personal data.</p>
<h2>16. Objections to Personal Data Processing</h2>
<p>You have the right to object to us processing your personal data where we are relying on legitimate interests and there is something about your particular situation which makes you want to object to processing on this ground. You also have the right to object where we are processing your personal data for direct marketing purposes.</p>
<h2>17. Transferring Personal Data to a Country Outside the EEA</h2>
<p>We may from time to time transfer personal data to external third parties outside the EEA. The transfer of personal data to a country outside of the EEA shall take place only if one or more adequacy measures as summarised in the GDPR apply. Please contact us if you want further information on the specific mechanism used by us when transferring your personal data out of the EEA.</p>`;

function now(): string {
    return new Date().toISOString();
}

export function seedContentPages(): ContentPagesDoc {
    const timestamp = now();
    return {
        about: {
            key: 'about',
            title: 'About Super Free Bingo',
            subtitle: '',
            bodyHtml: ABOUT_BODY,
            updatedAt: timestamp
        },
        privacy: {
            key: 'privacy',
            title: 'Privacy Policy',
            subtitle: 'Super Free Bingo — a product of Little Star Media Limited',
            bodyHtml: PRIVACY_BODY,
            updatedAt: timestamp
        },
        terms: {
            key: 'terms',
            title: 'Terms and Conditions',
            subtitle: '',
            bodyHtml: TERMS_BODY,
            updatedAt: timestamp
        },
        disclaimer: {
            key: 'disclaimer',
            title: 'Disclaimer',
            subtitle: '',
            bodyHtml: DISCLAIMER_BODY,
            updatedAt: timestamp
        }
    };
}
