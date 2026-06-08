import type React from 'react';
import type { Metadata } from 'next';
import { SfbetsFooter } from '@lsm/ui/components/sfbets-footer/sfbets-footer';
import { USP } from '@lsm/ui/components/usp/usp';
import { SfbetsNav } from '../../components/sfbets-nav';
import { legalText } from '../../data/site-content';

export const metadata: Metadata = {
    title: 'Privacy Policy | Super Free Bets',
    description: 'Privacy Policy for Super Free Bets.'
};

export default function PrivacyPolicyPage(): React.ReactElement {
    return (
        <main className="flex w-full flex-col bg-surface">
            <SfbetsNav />
            <USP text="OVER 150,000 OFFERS CLAIMED" />

            <section className="w-full max-w-[1440px] mx-auto px-4 py-8 md:px-16 md:py-12">
                <div className="flex flex-col gap-8 text-on-surface-light">
                    <h1 className="text-[32px] font-bold leading-tight text-tertiary md:text-[45px] md:leading-[52px]">
                        Privacy Policy
                    </h1>
                    <p className="text-base font-bold">Super Free Bets - a product of Little Star Media USA Limited</p>

                    <div className="flex flex-col gap-6 md:max-w-[948px]">

                        <Section title="1. Introduction">
                            <p>We are committed to protecting your personal data. This privacy policy ("Policy") will inform you about how, and for what purpose, we collect, process and look after your personal data when you visit our website and tell you about your privacy rights as a subscribed customer and website.</p>
                            <p>We may change this policy from time to time by updating this page.</p>
                            <p>The Super Free Bets website is not intended for use by those under the age of 21 years and/or those living outside the US. We do not knowingly collect data relating to children.</p>
                        </Section>

                        <Section title="2. Contact Details">
                            <p>Little Star Media USA Limited is and It's a Good Choice Ltd are the data controllers and are responsible for your personal data (collectively referred to as the "Company", "we", "us" or "our" in this Policy). This means that we are responsible for deciding how we hold and use personal information about you. Little Star Media Limited is a company registered in the United Kingdom with company number 5957310. It's a Good Choice Ltd is a company registered in the United Kingdom with company number 16175846. Both registered offices are at Suite 478-480, Exchange House, 450 Midsummer Boulevard, Milton Keynes, MK9 2EA.</p>
                            <p>We have appointed a data protection officer ("DPO"), Caroline Sugrue. The DPO is responsible for overseeing the implementation of this Policy and for monitoring compliance with applicable law. If you have any questions about this Policy, including any requests to exercise your legal rights, please contact the DPO at: <a href="mailto:dpo@littlestarmedia.com" className="underline">dpo@littlestarmedia.com</a>.</p>
                        </Section>

                        <Section title="3. Your Rights">
                            <p>Under this Privacy Policy and applicable law, if any, you have rights we need to make you aware of. This Privacy Policy sets out the following rights applicable to you (please refer to the parts of this policy indicated for further details):</p>
                            <ol className="list-decimal list-inside flex flex-col gap-1 pl-4">
                                <li>The right to be informed (Part 9);</li>
                                <li>The right of access (Part 10);</li>
                                <li>The right to rectification (Part 11);</li>
                                <li>The right to erasure (also known as the &apos;right to be forgotten&apos;) (Part 12);</li>
                                <li>The right to opt out (Part 13)</li>
                                <li>The right to restrict processing (Part 14);</li>
                                <li>The right to object (Part 15).</li>
                            </ol>
                            <p>If you wish to exercise any of the rights set out above, please contact our DPO.</p>
                        </Section>

                        <Section title="4. The Data We Collect About You">
                            <p>As used in this Privacy Policy, "personal data" is defined as any information relating to an identified or identifiable natural person; an identifiable natural person is one who can be identified, directly or indirectly, in particular by reference to an identifier such as a name, an identification number, location data, an online identifier, or to one or more factors specific to the physical, physiological, genetic, mental, economic, cultural, or social identity of that natural person. It does not include data where the identity has been removed. Please see below the personal data we may collect about you.</p>

                            <SubSection title="4.1 Identity Data including: name, user name or similar identifier, title, gender">
                                <p>4.1.1 To identify you as a user so that we can provide services to you and communicate with you in connection with your registration at the Super Free Bets website.</p>
                            </SubSection>

                            <SubSection title="4.2 Contact Data including: Email Address Mobile Phone Number">
                                <p>4.2.1 We email gambling offers and newsletters to users who have consented to receive these.</p>
                                <p>4.2.2 Users will normally receive emails up to 5 times per week, but on occasion this could be up to 6 times per week.</p>
                                <p>4.2.3 Users may receive gambling offers and site information by SMS if they have consented to receive these. Users should expect to receive up to 6 SMS messages per week.</p>
                                <p>4.2.4 We will use contact information to update you about changes to our policies and terms and conditions.</p>
                                <p>4.2.5 We also share your personal data with Facebook who help us show you relevant content and find similar users who might be interested in our services.</p>
                            </SubSection>

                            <SubSection title="4.3 IP Address">
                                <p>4.3.1 Used as a factor to determine robot behavior and detect malicious or suspicious software.</p>
                            </SubSection>

                            <SubSection title="4.4 Geographic Location">
                                <p>4.4.1 Used to determine fraudulent robot behavior and to detect whether you are eligible to use our website.</p>
                            </SubSection>

                            <SubSection title="4.5 Technical Data including: Device Screen size, Device Type Browser Information, Preferred Language">
                                <p>4.5.1 Hotjar</p>
                                <p>4.5.1.1 We use Hotjar in order to better understand our users' needs and to optimize this service and experience (e.g. how much time they spend on which pages, which links they choose to click, what users do and don't like, etc.). This enables us to build and maintain our service with user feedback. Hotjar uses cookies and other technologies to collect data on our users' behavior and their devices (in particular, device IP address (captured and stored only in anonymized form), device screen size, device type (unique device identifiers), browser information, geographic location (country only), and preferred language on our website).</p>
                                <p>4.5.1.2 Hotjar stores this information in a pseudonymized user profile. We will not (nor will Hotjar) use this information to identify individual users or to match it with further data on an individual user. For further details, please see Hotjar's privacy policy by clicking on this link: <a href="https://www.hotjar.com/privacy" className="underline" target="_blank" rel="noopener noreferrer">https://www.hotjar.com/privacy</a>.</p>
                                <p>4.5.2 Opt-Out:</p>
                                <p>4.5.2.1 You can opt-out to the creation of a user profile, Hotjar's storing of data about your usage of our site and Hotjar's use of tracking cookies on other websites by following this opt-out: <a href="https://www.hotjar.com/legal/compliance/opt-out" className="underline" target="_blank" rel="noopener noreferrer">https://www.hotjar.com/legal/compliance/opt-out</a></p>
                                <p>4.5.3 Cookies and Analytics</p>
                                <p>4.5.3.1 We use Google Analytics on this website. Therefore, third-party vendors, including Google, may show our ads on sites across the internet. The Google Analytics features that have been implemented are used for Display Advertising (including Google Display Network Impression Reporting, the DoubleClick Campaign Manager integration, or Google Analytics Demographics and Interest Reporting).</p>
                                <p>4.5.3.2 We (and third-party vendors including Google) use first-party cookies (such as the Google Analytics cookie) and third-party cookies (such as the DoubleClick cookie) together to inform, optimize, and serve ads based on past customer visits to our website. We also use these cookies to report how our ad impressions and other ad services, and interactions with these, relate to visits to our site.</p>
                                <p>4.5.3.3 We use Google Analytics Demographics and Interest Reporting in order to target users who have a higher probability of being interested in our products. We also may use third party audience data (such as age, gender, and interests) to help guide our website offering to better meet consumer needs, and ultimately improve the user experience.</p>
                                <p>4.5.3.4 Opt-out: Using the Ads Settings, you can opt-out of Google Analytics for Display Advertising and customize Google Display Network ads. Read more here: <a href="https://tools.google.com/dlpage/gaoptout" className="underline" target="_blank" rel="noopener noreferrer">https://tools.google.com/dlpage/gaoptout</a></p>
                                <p>4.5.4 How we use cookies:</p>
                                <p>4.5.4.1 A cookie helps us, for example, to analyse web traffic or lets us know when you visit a particular site. This enables us to enhance your user experience when visiting Super Free Bets by placing cookies on your computer.</p>
                                <p>4.5.4.2 Cookies allow web applications to respond to you as an individual. The web application can tailor its operations to your needs, likes and dislikes by gathering and remembering information about your preferences.</p>
                                <p>4.5.4.3 We use traffic log cookies to identify which pages are being used. This helps us analyse data about webpage traffic and improve our website in order to tailor it to customer needs. We only use this information for statistical analysis purposes and then the data is removed from the system.</p>
                                <p>4.5.4.4 To find out more or to change how cookies interact with your computer, click here.</p>
                            </SubSection>

                            <SubSection title="4.6 Analytics Data">
                                <p>4.6.1 We use analytics data to improve our website, products/services, marketing, and user experience.</p>
                            </SubSection>
                        </Section>

                        <Section title="5. How we use your personal data">
                            <p>We will only use your personal data when the law allows us to do so. Most commonly, we will use your personal data in the following circumstances:</p>
                            <ol className="list-decimal list-inside flex flex-col gap-1 pl-4">
                                <li>you have given consent to the processing of your personal data for one or more specific purposes;</li>
                                <li>where we need to perform the contract we have entered into with you;</li>
                                <li>for compliance with a legal obligation;</li>
                                <li>to protect your interests (or someone else's interests); or</li>
                                <li>for our legitimate interests (or those of a third party), except where such interests are overridden by your fundamental rights and freedoms.</li>
                            </ol>
                            <p>We may share your personal data with third parties (as set out below) and the third parties to whom we may choose to sell, transfer or merge parts of our business or our assets. Alternatively, we may seek to acquire other businesses or merge with them. If a change happens to our business, then the new owners may use your personal data in the same way as set out in this Policy.</p>
                            <p>We require all third parties to respect the security of your personal data and to treat it in accordance with the law. We do not allow our third-party service providers to use your personal data for their own purposes and only permit them to process your personal data for specified purposes and in accordance with our instructions.</p>
                            <p>We may share your personal data with the following third parties:</p>
                            <ol className="list-decimal list-inside flex flex-col gap-1 pl-4">
                                <li>service providers (including marketing and digital analytics) including, but not limited to, Hotjar, Reportdash, Mozenda, Microsoft, Google Analytics, Acoustic L.P, Voodoo, AWS, Twilio, Cake, Digital Ocean; Reactful Inc.; Bulk SMS Limited; Accelerize Inc. and Facebook;</li>
                                <li>advertising networks;</li>
                                <li>search information providers;</li>
                                <li>banks and payment providers;</li>
                                <li>professional advisors; and</li>
                                <li>law enforcement agencies.</li>
                            </ol>
                            <p>You can ask us or third parties to stop sending you marketing messages at any time by following the opt-out links on any marketing message sent to you or by contacting us at any time.</p>
                            <p>Where you opt out of receiving these marketing messages, this will not apply to our processing of your personal data that we process for non-marketing purposes. If you would like us to stop processing that data too, please let us know by exercising your rights summarized in this policy, particularly in parts 11, 12 and 16 below.</p>
                        </Section>

                        <Section title="6. Accuracy of Data and Keeping Data Up-to-Date">
                            <p>It is important that the personal data we hold about you is accurate and current. Please keep us informed if your personal data changes during your relationship with us. You have the right to request the rectification of personal data that we hold about you, as set out in Part 11, below.</p>
                        </Section>

                        <Section title="7. Data Retention">
                            <p>We shall not keep your personal data for any longer than is necessary in light of the purpose or purposes for which that personal data was originally collected, held, and processed. We may retain your personal data for a longer period in the event of a complaint or if we reasonably believe there is a prospect of litigation in respect to our relationship with you.</p>
                            <p>When personal data is no longer required, all reasonable steps will be taken to erase or otherwise dispose of it without delay.</p>
                            <p>If you are an active user, we will retain your personal data for the entire time that you are actively engaging with our site or products and for a further period of 6 months from the date of your last engagement. After that you will become an inactive user and we will put you onto a soft suppression list for a period of 2 years, following which we erase your details.</p>
                            <p>If you request to no longer receive direct marketing from us, we will place your details onto a hard suppression list, where it will not be used, and you will be deleted from that hard suppression list at the end of 5 years.</p>
                            <p>If you require any information or have any data requests, you can contact our DPO, Caroline Sugrue, at: <a href="mailto:dpo@littlestarmedia.com" className="underline">dpo@littlestarmedia.com</a>.</p>
                        </Section>

                        <Section title="8. Secure Processing">
                            <p>We have put in place appropriate security measures to prevent your personal data against unauthorized or unlawful processing and against accidental loss, destruction, or damage. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.</p>
                            <p>They will only process your personal data on our instructions and they are subject to a duty of confidentiality.</p>
                            <p>We have put in place procedures to deal with any suspected personal data breach and will notify you and any applicable regulator of a breach where we are legally required to do so.</p>
                        </Section>

                        <Section title="9. Keeping You Informed">
                            <p>Where your personal data is collected directly from you, you will be informed of its purpose at the time of collection.</p>
                            <p>Where your personal data is obtained from a third party, you will be informed of its purpose:</p>
                            <ul className="list-disc list-inside flex flex-col gap-1 pl-4">
                                <li>if the personal data is used to communicate with you, when the first communication is made;</li>
                                <li>if the personal data is to be transferred to another party, before that transfer is made; or</li>
                                <li>As soon as reasonably possible and in any event not more than one month after the personal data is obtained.</li>
                            </ul>
                        </Section>

                        <Section title="10. Your Access Requests">
                            <p>You may make subject access requests ("SARs") at any time to find out more about the personal data which we hold about you and to check that we are lawfully processing it.</p>
                            <p>If you wish to make a SAR, you should do so by emailing our DPO at <a href="mailto:dpo@littlestarmedia.com" className="underline">dpo@littlestarmedia.com</a>.</p>
                            <p>Responses to SARs shall normally be made within one month of receipt. However, this may be extended by up to two months if the SAR is complex and/or numerous requests are made. If such additional time is required, you shall be informed.</p>
                            <p>We do not charge a fee for the handling of normal SARs. We reserve the right to charge reasonable fees for additional copies of information that has already been supplied to you, and for requests that are manifestly unfounded or excessive, particularly where such requests are repetitive.</p>
                        </Section>

                        <Section title="11. Rectification of Personal Data">
                            <p>You have the right to require us to rectify any of your personal data that is inaccurate or incomplete.</p>
                            <p>Within one month of you making your request, we shall rectify the personal data in question, and inform you of the rectification. The period may be extended by up to two months in the case of complex requests. If such additional time is required, you shall be informed. In the event that any affected personal data has been disclosed to third parties, those parties shall be informed of any rectification that must be made to that personal data.</p>
                        </Section>

                        <Section title="12. Erasure of Personal Data">
                            <p>You have the right to request that we erase your personal data in the following circumstances:</p>
                            <ol className="list-decimal list-inside flex flex-col gap-1 pl-4">
                                <li>It is no longer necessary for us to process your personal data for the purpose(s) for which it was originally collected;</li>
                                <li>You no longer wish us to process your personal data;</li>
                                <li>Your personal data has been processed unlawfully; or</li>
                                <li>Your personal data needs to be erased in order for us to comply with a particular legal obligation.</li>
                            </ol>
                            <p>Unless we have reasonable grounds to refuse to erase your personal data, we will comply with all requests for erasure and inform you when this has been done within one month of receipt of your request. The period can be extended by up to two months in the case of complex requests. If such additional time is required, we will inform you.</p>
                            <p>In the event that your personal data to be erased has been disclosed to third parties, we will inform those parties of the erasure (unless it is impossible or would require disproportionate effort to do so).</p>
                        </Section>

                        <Section title="13. Opting Out - Marketing Communications">
                            <p>You can opt out of receiving marketing communications from us at any time by unsubscribing from our database. If you wish to unsubscribe from this service, please click the &apos;Unsubscribe&apos; link in any email that you have received from us.</p>
                            <p>Alternatively, you can contact us via the &apos;Contact us&apos; link at the bottom of the site or by emailing <a href="mailto:support@superfreebets.com" className="underline">support@superfreebets.com</a>, using the subject line "Unsubscribe" and providing your name, as well as the email address and mobile number that you signed up with. Please allow up to 28 days for your request to be processed.</p>
                        </Section>

                        <Section title="14. Opting Out - SMS">
                            <p>Text STOP to +12312611337 to stop receiving our SMS messages. You will no longer receive text messages from Super Free Bets.</p>
                            <p>Alternatively, you may opt-out of receiving our SMS messages at any time by contacting our customer care team at: <a href="mailto:support@superfreebets.com" className="underline">support@superfreebets.com</a>.</p>
                        </Section>

                        <Section title="15. Restriction of Personal Data Processing">
                            <p>You may request that we cease processing the personal data we hold about you. If you make such a request, we shall retain only the amount of your personal data (if any) that is necessary to ensure that the personal data in question is not processed further.</p>
                            <p>In the event that any affected personal data has been disclosed to third parties, those parties shall be informed of the applicable restrictions on processing it (unless it is impossible or would require disproportionate effort to do so).</p>
                        </Section>

                        <Section title="Objections to Personal Data Processing">
                            <p>You have the right to object to us processing your personal data where we are relying on legitimate interests and there is something about your particular situation which makes you want to object to processing on this ground as you feel it impacts on your fundamental rights and freedoms. You also have the right to object where we are processing your personal data for direct marketing purposes. In some limited cases, we may demonstrate that we have compelling legitimate grounds to process your information which override your rights and freedoms.</p>
                        </Section>

                        <Section title="17. California Resident User Privacy Rights">
                            <p className="font-bold">SHINE THE LIGHT LAW</p>
                            <p>California residents who provide personal data in connection with obtaining products or services for personal, family or household use are entitled to request, and obtain from us once each calendar year, information about the personal data we shared, if any, with other businesses for their own direct marketing uses. If applicable, this information would include the categories of customer information and the names and addresses of those businesses with which we shared customer information for the immediately prior calendar year (e.g. requests made in 2019 will receive information regarding 2018 sharing activities).</p>
                            <p>To obtain this information, please send an email message to <a href="mailto:dpo@littlestarmedia.com" className="underline">dpo@littlestarmedia.com</a> with "Request for California Privacy Information" in the subject line and in the body of your message. We will provide the requested information to you at your e-mail address in response. Please be aware that not all data sharing is covered by the "Shine the Light" requirements and only information covered under this law will be included in our response.</p>

                            <p className="font-bold">CALIFORNIA CONSUMER PRIVACY ACT</p>
                            <p>This Section supplements the information contained in this Privacy Policy and applies solely to all website visitors, users and others who reside in the State of California. We adapt this section of the Privacy Policy to comply with the California Consumer Privacy Act 2018 (CCPA) and other California privacy laws (together "California Laws"). Any terms defined in the CCPA shall have the same meaning when used in this Section.</p>
                            <p>Categories of information we collect, how we collect it and to whom we may share</p>
                            <p>We collect information that identifies, relates to, describes, references, is reasonably capable of being associated with, or could reasonably be linked, directly or indirectly, with a particular consumer, household or device. For purposes of this section only, this information is referred to as "personal data."</p>
                            <p>Section 4 of this Privacy Policy sets forth the specific information we collect and the sources from which we obtain that information. The below table outlines the Section 4 categories of data collected, the purposes for its collection and the categories of third parties with whom we may share the personal data</p>

                            <SubSection title="17.1 Identity Data including: name, user name or similar identifier, title, gender">
                                <p>17.1.1 To identify you as a user so that we can provide services to you and communicate with you in connection with your registration at the Super Free Bets website.</p>
                            </SubSection>

                            <SubSection title="17.2 Contact Data including: Email Address Mobile Phone Number">
                                <p>17.2.1 We email gambling offers and newsletters to users who have consented to receive these.</p>
                                <p>17.2.2 Users will normally receive emails up to 3 times per week, but on occasion this could be up to 4 times per week.</p>
                                <p>17.2.3 Users may receive gambling offers and site information by SMS if they have consented to receive these. Users should expect to receive up to 4 SMS messages per week.</p>
                                <p>17.2.4 We will use contact information to update you about changes to our policies and terms and conditions.</p>
                                <p>17.2.5 We also share your personal data with Facebook who help us show you relevant content and find similar users who might be interested in our services.</p>
                            </SubSection>

                            <SubSection title="17.3 IP Address">
                                <p>17.3.1 Used as a factor to determine robot behavior and detect malicious or suspicious software.</p>
                            </SubSection>

                            <SubSection title="17.4 Geographic Location">
                                <p>17.4.1 Used to determine fraudulent robot behavior and to detect whether you are eligible to use our website.</p>
                            </SubSection>

                            <SubSection title="17.5 Technical Data including: Device Screen size, Device Type Browser Information, Preferred Language">
                                <p>17.5.1 Hotjar</p>
                                <p>17.5.1.1 We use Hotjar in order to better understand our users' needs and to optimize this service and experience (e.g. how much time they spend on which pages, which links they choose to click, what users do and don't like, etc.). This enables us to build and maintain our service with user feedback. Hotjar uses cookies and other technologies to collect data on our users' behavior and their devices (in particular, device IP address (captured and stored only in anonymized form), device screen size, device type (unique device identifiers), browser information, geographic location (country only), and preferred language on our website).</p>
                                <p>17.5.1.2 Hotjar stores this information in a pseudonymized user profile. We will not (nor will Hotjar) use this information to identify individual users or to match it with further data on an individual user. For further details, please see Hotjar's privacy policy by clicking on this link: <a href="https://www.hotjar.com/privacy" className="underline" target="_blank" rel="noopener noreferrer">https://www.hotjar.com/privacy</a>.</p>
                                <p>17.5.2 Opt-Out:</p>
                                <p>17.5.2.1 You can opt-out to the creation of a user profile, Hotjar's storing of data about your usage of our site and Hotjar's use of tracking cookies on other websites by following this opt-out: <a href="https://www.hotjar.com/legal/compliance/opt-out" className="underline" target="_blank" rel="noopener noreferrer">https://www.hotjar.com/legal/compliance/opt-out</a></p>
                                <p>17.5.3 Cookies and Analytics</p>
                                <p>17.5.3.1 We use Google Analytics on this website. Therefore, third-party vendors, including Google, may show our ads on sites across the internet. The Google Analytics features that have been implemented are used for Display Advertising (including Google Display Network Impression Reporting, the DoubleClick Campaign Manager integration, or Google Analytics Demographics and Interest Reporting).</p>
                                <p>17.5.3.2 We (and third-party vendors including Google) use first-party cookies (such as the Google Analytics cookie) and third-party cookies (such as the DoubleClick cookie) together to inform, optimize, and serve ads based on past customer visits to our website. We also use these cookies to report how our ad impressions and other ad services, and interactions with these, relate to visits to our site.</p>
                                <p>17.5.3.3 We use Google Analytics Demographics and Interest Reporting in order to target users who have a higher probability of being interested in our products. We also may use third party audience data (such as age, gender, and interests) to help guide our website offering to better meet consumer needs, and ultimately improve the user experience.</p>
                                <p>17.5.3.4 Opt-out: Using the Ads Settings, you can opt-out of Google Analytics for Display Advertising and customize Google Display Network ads. Read more here: <a href="https://tools.google.com/dlpage/gaoptout" className="underline" target="_blank" rel="noopener noreferrer">https://tools.google.com/dlpage/gaoptout</a></p>
                                <p>17.5.4 How we use cookies:</p>
                                <p>17.5.4.1 A cookie helps us, for example, to analyse web traffic or lets us know when you visit a particular site. This enables us to enhance your user experience when visiting Super Free Bets by placing cookies on your computer.</p>
                                <p>17.5.4.2 Cookies allow web applications to respond to you as an individual. The web application can tailor its operations to your needs, likes and dislikes by gathering and remembering information about your preferences.</p>
                                <p>17.5.4.3 We use traffic log cookies to identify which pages are being used. This helps us analyse data about webpage traffic and improve our website in order to tailor it to customer needs. We only use this information for statistical analysis purposes and then the data is removed from the system.</p>
                                <p>17.5.4.4 To find out more or to change how cookies interact with your computer, click here.</p>
                            </SubSection>

                            <SubSection title="17.6 Analytics Data">
                                <p>17.6.1 We use analytics data to improve our website, products/services, marketing, and user experience</p>
                            </SubSection>
                        </Section>

                        <Section title="18. Children">
                            <p>The Children's Online Privacy Protection Act of 1998 ("COPPA"), 15 U.S.C. §§6501-6506, protects the online privacy of children under 13 years of age. We do not knowingly collect or maintain personal data from anyone under the age of 13, unless or except as permitted by law. Any person who provides personal data through the website represents to us that he or she is 13 years of age or older. If we learn personal data has been collected from a user under 13 years of age on or through the website, then we will take the appropriate steps to cause this information to be deleted. If you are the parent or legal guardian of a child under 13 who has become a member of the website or has otherwise transferred personal data to the website, please contact the DPO at <a href="mailto:dpo@littlestarmadia.com" className="underline">dpo@littlestarmadia.com</a> to have that child&apos;s information deleted.</p>
                        </Section>

                    </div>
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
            <div className="flex flex-col gap-2 text-[14px] leading-6 tracking-[0.5px] text-on-surface-light">
                {children}
            </div>
        </div>
    );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }): React.ReactElement {
    return (
        <div className="flex flex-col gap-2 pl-4">
            <p className="font-bold">{title}</p>
            <div className="flex flex-col gap-2">
                {children}
            </div>
        </div>
    );
}
