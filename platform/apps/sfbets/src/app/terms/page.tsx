import type React from 'react';
import type { Metadata } from 'next';
import { SfbetsFooter } from '@lsm/ui/components/sfbets-footer/sfbets-footer';
import { USP } from '@lsm/ui/components/usp/usp';
import { SfbetsNav } from '../../components/sfbets-nav';
import { legalText } from '../../data/site-content';

export const metadata: Metadata = {
    title: 'Terms and Conditions | Super Free Bets',
    description: 'Terms and Conditions for Super Free Bets.'
};

const SMS_BULLETS = [
    'You should expect to receive up to 4 SMS marketing messages from Super Free Bets per week.',
    'Text STOP to +12312611337 to stop receiving our SMS messages. You will no longer receive text messages from Super Free Bets.',
    'Alternatively, you may opt-out of receiving our SMS messages at any time by contacting our customer care team at: support@superfreebets.com.',
    'We do not charge to send our SMS marketing messages to you however, some carriers may charge you standard message rates and data charges to receive your text messages or reply to them. Please check with your cell phone carrier for further details of any charges that will apply to you.',
    'The following text commands are available: STOP: At any time, you can text STOP to +12312611337. This will prevent you from receiving any future texts from Super Free Bets. HELP: At any time, you can text HELP to +12312611337.',
];

const CARRIERS = [
    'AT&T', 'T-Mobile®', 'Verizon Wireless', 'Sprint, Boost', 'Alltel (Verizon Wireless)',
    'U.S. Cellular', 'Cellular One', 'MetroPCS', 'ACS/Alaska', 'Bluegrass Cellular',
    'Cellular One of East Central Illinois', 'Centennial Wireless', 'Cox Communications',
    'EKN/Appalachian Wireless', 'GCI, Illinois Valley Cellular', 'Immix/Keystone Wireless',
    'Inland Cellular', 'Nex-Tech Wireless', 'Rural Cellular Corporation', 'Thumb Cellular',
    'United Wireless, West Central (WCC)', 'Cellcom', 'C Spire Wireless CellSouth',
    'Cricket', 'Cincinnati Bell', 'Virgin Mobile®',
];

const EMAIL_BULLETS = [
    'You should expect to receive up to 4 emails from Super Free Bets per week.',
    'You may opt out of receiving our emails by clicking on the unsubscribe link in our mailers or by sending \'unsubscribe\' to: support@superfreebets.com.',
    'Should you require any support with opting out of our emails or with any other issues please contact our customer care team at: support@superfreebets.com.',
];

const GENERAL_BULLETS = [
    'The content of the pages of this website is for your general information and personal, non-commercial use only. It is subject to change without notice.',
    'You agree to use the website only for purposes that are permitted by (a) the Terms and Conditions and (b) any applicable law, regulation or generally accepted practices or guidelines in the relevant jurisdictions.',
    'Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.',
    'Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through this website meet your specific requirements.',
    'This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.',
    'If you make copies of any of the Materials, you must retain on any such copies all copyright and other proprietary notices contained in the original Materials. You may not modify, publicly display, publicly perform, or distribute the Materials. As between you and us, we owns the website. The website is protected under United States and international copyright laws. Any unauthorized use of the website may violate copyright, trademark, and other laws.',
    'All trademarks reproduced in this website, which are not the property of, or licensed to the operator, are acknowledged on the website.',
    'You agree not to use the website (a) in a manner that violates any local, state, national, foreign, or international statute, regulation, rule, order, treaty, or other law; (b) to interfere with or disrupt the website or servers or networks connected to the website. You further agree not to (1) use any data mining, robots, or similar data gathering or extraction methods in connection with the website; or (2) attempt to gain unauthorized access to any portion of the website or any other accounts, computer systems, or networks connected to the website, whether through hacking, password mining, or any other means.',
    'Unauthorized use of this website may give to a claim for damages and/or be a criminal offence.',
    'This website includes links to other websites, including slot game sites operated by third parties. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of linked website(s). It is your responsibility to make yourself familiar with the terms and conditions and play rules operated by those third parties.',
    'Please note that where third party sites offer \'free slots\' or \'free slot games\' schemes, they will be subject to the rules of the particular site operator. There may be restrictions upon how you can use and/or withdraw any sums or winnings from \'free slots\' or \'free slot games\' schemes. Such schemes may only apply to new, first time players. Rules vary from scheme to scheme and you should check the terms and conditions and scheme rules appearing on the particular third party website. If in doubt, you should contact customer support for the relevant site operator.',
    'The offers that are shown within our advertising and communications may not appear or may differ from those on site, according to which device you are browsing on, e.g. mobile, desktop or tablet.',
    'You may not create a link to this website from another website or document without Super Free Bets\' prior written consent.',
    'Your use of this website and any dispute arising out of such use of the website is subject to the laws of England and Wales.',
];

const DISCLAIMER_PARAS = [
    'The information contained in this website is for general information purposes only.',
    'The information is provided by Super Free Bets and whilst we endeavor to keep the information up-to-date and correct, we are not responsible for any incorrect or inaccurate information, whether caused by any website users, tampering, hacking, or by any of the equipment or programming associated with or utilized in the website, including server errors, viruses or otherwise, and assumes no responsibility for any error, omission, interruption, deletion, defect, delay in operation or transmission, communications line failure, technical error, theft or destruction or unauthorized access to any website(s). We are not responsible for any injury, including death, or damage, whether personal or property, to participants or to any third party\'s computer related to or resulting from use of the website.',
    'We make no warranties of any kind, either express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose or non infringement as regards to any use of the website. Void where prohibited, as some jurisdictions may not allow limitations of exclusion of liability for incidental or consequential damages or exclusion of implied warranties. In no event will we be responsible or liable for any damages or losses of any kind, including, without limitation, direct, indirect, incidental, consequential or punitive damages arising out of your access to and use of the website site or any other medium associated with us. Without limiting the foregoing, everything on the website is provided "as is" without warranty of any kind, either express or implied, including but not limited to, implied warranties of merchantability, fitness for a particular purpose or non-infringement. Some jurisdictions may not allow limitations or exclusion of liability for incidental or consequential damages or exclusion of implied warranties so some of the above limitations or exclusions may not apply to you. Check your local laws for any restrictions or limitations regarding these limitations or exclusions.',
    'In addition, we are not responsible for and shall be defended, indemnified, held harmless and released by each user for any claims, liabilities, lawsuits, judgments, causes of action, proceedings, injuries, death, losses, costs, expenses or damages of any kind resulting from, in connection with, or arising from your use of the website.',
    'In particular, by using our website you agree to waive all of your rights to bring any claim, action, or proceeding against us in connection with the website; and to forever and irrevocably agree to release, defend, indemnify, and hold us harmless from any and all claims, lawsuits, judgments, causes of action, proceedings, demands, fines, penalties, liability costs and expenses (including, without limitation, reasonable outside attorneys\' fees) for an injuries, losses or damages of any kind to persons, including, without limitation, death, or property resulting in whole or in part, directly or indirectly, from: (a) your use or misuse of the website, (b) the violation of any third party privacy, personal, publicity or proprietary rights, (c) typographical or printing errors in these Terms and Conditions, (d) human error, (e) any technical malfunctions or unavailability of any website or any telephone network, computer system, computer online system, computer timing and/or dating mechanism, computer equipment, software, or Internet service provider, or mail service utilized by you or us, (f) interruption or inability to access the website due to hardware or software compatibility problems, (g) any damage to your (or any third person\'s) computer and/or its contents related to or resulting from any part of the website, (h) any wrongful, negligent, or unauthorized act or omission on the part of us, (i) the collection, use and/or sharing of your personal data in compliance with our Privacy Policy, or (j) the negligence or wilful misconduct by you.',
    'Some jurisdictions do not allow the exclusion of certain warranties or the limitation or exclusion of liability for certain damages. Accordingly, some of the above disclaimers and limitations of liability may not apply to you. To the extent that we may not, as a matter of applicable law, disclaim any implied warranty or limit its liabilities, the scope and duration of such warranty and the extent of our liability shall be the minimum permitted under such applicable law.',
    'Through this website you are able to link to other websites which are not under the control of Super Free Bets.',
    'Any links to third party sites (including bingo sites) are provided for your convenience to provide further information. We have no responsibility for the content of linked website(s). If you use these links, you will leave our website. We are not obligated to review such third-party websites, do not control such third-party websites, and are not responsible for any such third-party websites or their content (or the products, services, or content available through the same). Thus, we do not endorse or make any representations about such third-party websites, any information, software, products, services, or materials found there or any results that may be obtained from using them. If you decide to access any of the third-party websites linked to our website, you do so entirely at your own risk. It is your responsibility to make yourself familiar with the terms and conditions and play rules operated by those third parties.',
    'Please note that where third party sites offer \'free slots\' or \'free slot games\' schemes, they will be subject to the rules of the particular site operator. There may be restrictions upon how you can use and/or withdraw any sums or winnings from \'free slots\' or \'free slot games\' schemes. Such schemes may only apply to new, first time players. Rules vary from scheme to scheme and you should check the terms and conditions and scheme rules appearing on the particular third-party website. If in doubt, you should contact customer support for the relevant site operator.',
    'Every effort is made to keep the website up and running smoothly. However, Super Free Bets takes no responsibility for, and will not be liable for, the website being temporarily unavailable due to technical issues beyond our control.',
    'Any product or service name or slogan or logo contained in our website are trademarks of ours or our suppliers or licensors and may not be copied, imitated, or used, in whole or in part, without our prior written permission or the permission of the applicable trademark holder. Ownership of all such trademarks and the goodwill associated therewith remains with us or the applicable trademark holder. You may not use any metatags or any other "hidden text" utilizing any name, trademark, or product or service name of ours without our prior written permission. In addition, the look and feel of the website (including all page headers, custom graphics, button icons, and scripts) is the service mark, trademark, and/or trade dress of ours and may not be copied, imitated, or used (in whole or in part) without our prior written permission. Reference to any products, services, processes, or other information, by trade name, trademark, or otherwise does not constitute or imply endorsement, sponsorship, or recommendation thereof by us.',
    'We may, in our sole and absolute discretion, change these Terms and Conditions from time to time. We will post notice of such changes on the applicable website. If you object to any such changes, your sole recourse shall be to cease using our website. Continued use of the website following notice of any such changes shall indicate your acknowledgement of such changes and agreement to be bound by the terms and conditions of such changes. Certain provisions of these Terms and Conditions may be superseded by expressly-designated legal notices or terms located on particular pages of our website and, in such circumstances, the expressly-designated legal notice or term shall be deemed to be incorporated into these Terms and Conditions and to supersede the provision(s) of these Terms and Conditions that are designated as being superseded.',
    'These Terms and Conditions have been drafted in the English language. In the event any translation of these Terms and Conditions is prepared for convenience or any other purpose, the provisions of the English version shall prevail.',
    'These Terms and Conditions constitute the entire and exclusive and final statement of the agreement between you and us with respect to the subject matter hereof, superseding any prior agreements or negotiations between you and us with respect to such subject matter.',
    'The law of England and Wales shall be used to govern, construe and enforce all rights and duties of the parties arising from or in any way relating to the subject matter of these Terms and Conditions including, without limitation, the performance, construction interpretation and enforcement thereof.',
    'Our failure to exercise or enforce any right or provision of these Terms and Conditions shall not constitute a waiver of such right or provision. If any provision of these Terms and Conditions is found by a court of competent jurisdiction to be invalid, you nevertheless agree that the court should endeavor to give effect to the intentions of the parties as reflected in the provision, and that the other provisions of these Terms and Conditions shall remain in full force and effect.',
];

export default function TermsPage(): React.ReactElement {
    return (
        <main className="flex w-full flex-col bg-surface">
            <SfbetsNav />
            <USP text="OVER 5,000,000 SUBSCRIBERS" />

            <section className="w-full max-w-[1440px] mx-auto px-4 py-8 md:px-16 md:py-12">
                <div className="flex flex-col gap-8 md:max-w-[948px] text-on-surface-light">
                    <h1 className="text-[32px] font-bold leading-tight text-tertiary md:text-[45px] md:leading-[52px]">
                        Terms &amp; Conditions
                    </h1>
                    <p className="text-base font-bold">Superfreebetsmi.com</p>

                    <div className="flex flex-col gap-3 text-base leading-6 tracking-[0.5px]">
                        <p>Attention: By using this website, you agree and affirm that you have read and accept these terms and conditions. If you do not accept these terms and conditions, you are not authorized to use this website. These terms and conditions govern your use of this website, and any content that Little Star Media Ltd ("we") make available through the website ("materials"), and any services may provide through the website ("services"). The website, materials and services are referred to in these terms and conditions collectively as the "website." By using the website you further agree with our disclaimer, copyright notice and privacy policy: <a href="/privacy-policy" className="underline">superfreebetsmi.com/privacy-policy</a>.</p>
                        <p>This website is not for use by those under the age of 21 years and/or those living outside the United States. If you are over 21 and live in Michigan, you are welcome to use our website.</p>
                        <p>The term 'Super Free Bets' or 'us' or 'we' refers to the owner of the website whose registered office is Little Star Media USA Ltd, Exchange House, 450 Midsummer Boulevard, Milton Keynes, MK9 2EA, United Kingdom.</p>
                        <p>The term 'you' refers to the user or viewer of our website.</p>
                    </div>

                    <Section title="Promotional Marketing Terms:">
                        <ul className="list-disc list-inside flex flex-col gap-2 pl-4 text-base leading-6 tracking-[0.5px]">
                            <li>By signing up to the Super Free Bets website (entering your name, email address and/or mobile number), you agree to receive marketing communications from Super Free Bets and their associated websites, including SMS and/or email messages.</li>
                            <li>You do not have to sign up to SMS or email promotions — purchases can be made directly on-site at any time.</li>
                        </ul>
                    </Section>

                    <Section title="SMS Marketing Terms:">
                        <ul className="list-disc list-inside flex flex-col gap-2 pl-4 text-base leading-6 tracking-[0.5px]">
                            {SMS_BULLETS.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                        <p className="text-base leading-6 tracking-[0.5px]">Participating carriers:</p>
                        <ul className="list-disc list-inside flex flex-col gap-1 pl-4 text-base leading-6 tracking-[0.5px]">
                            {CARRIERS.map((carrier, i) => (
                                <li key={i}>{carrier}</li>
                            ))}
                        </ul>
                        <p className="text-base leading-6 tracking-[0.5px]">Super Free Bets may, from time to time, in its discretion and without notice to you, limit the carriers that support Super Free Bets. Certain other carriers may not support the program.</p>
                        <p className="text-base leading-6 tracking-[0.5px]">Carriers are not liable for undelivered or delayed messages.</p>
                    </Section>

                    <Section title="Email Marketing Terms:">
                        <ul className="list-disc list-inside flex flex-col gap-2 pl-4 text-base leading-6 tracking-[0.5px]">
                            {EMAIL_BULLETS.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </Section>

                    <Section title="General Terms:">
                        <ul className="list-disc list-inside flex flex-col gap-2 pl-4 text-base leading-6 tracking-[0.5px]">
                            {GENERAL_BULLETS.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </Section>

                    <Section title="Disclaimer">
                        <div className="flex flex-col gap-3 text-base leading-6 tracking-[0.5px]">
                            {DISCLAIMER_PARAS.map((para, i) => (
                                <p key={i}>{para}</p>
                            ))}
                        </div>
                    </Section>

                    <p className="text-base leading-6 tracking-[0.5px]">
                        Kind regards,<br />
                        <span className="font-bold">Super Free Bets Management</span>
                    </p>
                </div>
            </section>

            <SfbetsFooter legalText={legalText} state="mi" />
        </main>
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }): React.ReactElement {
    return (
        <div className="flex flex-col gap-3">
            <h2 className="text-base font-bold text-on-surface-light">{title}</h2>
            {children}
        </div>
    );
}
