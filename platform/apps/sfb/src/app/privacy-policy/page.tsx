import type React from 'react';
import type { Metadata } from 'next';
import { SfbFooter } from '@lsm/ui/components/sfb-footer/sfb-footer';
import { USP } from '@lsm/ui/components/usp/usp';
import { SfbNav } from '../../components/sfb-nav';
import { getCmsSiteSettings } from '../../data/cms-content';

export const metadata: Metadata = {
    title: 'Privacy Policy | Super Free Bingo',
    description: 'Privacy Policy for Super Free Bingo — how we collect, use, and protect your personal data.'
};

export default async function PrivacyPolicyPage(): Promise<React.ReactElement> {
    const settings = await getCmsSiteSettings();

    return (
        <main className="flex w-full flex-col bg-surface">
            <SfbNav items={settings.navItems} />
            <USP text={settings.uspText} />

            <section className="w-full max-w-[1440px] mx-auto px-4 py-8 md:px-16 md:py-12">
                <div className="flex flex-col gap-8">
                    <div className="px-4 py-3">
                        <h1 className="text-[32px] font-bold leading-tight text-tertiary md:text-[45px] md:leading-[52px]">
                            Privacy Policy
                        </h1>
                        <p className="mt-2 text-sm text-on-surface-light">Super Free Bingo — a product of Little Star Media Limited</p>
                    </div>

                    <div className="w-full md:max-w-[948px] flex flex-col gap-8 text-base leading-6 tracking-[0.5px] text-on-surface-light">

                        <div className="flex flex-col gap-3">
                            <h2 className="text-lg font-bold">1. Introduction</h2>
                            <p>We are committed to protecting your personal data. This privacy policy ("Policy") will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights as a subscribed customer and website user under the General Data Protection Regulation 2016/679 ("GDPR").</p>
                            <p>We may change this policy from time to time by updating this page.</p>
                            <p>The Super Free Bingo website is not intended for use by those under the age of 18 years and/or those living outside the UK. We do not knowingly collect data relating to children.</p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <h2 className="text-lg font-bold">2. Contact Details</h2>
                            <p>Little Star Media Limited and It&apos;s a Good Choice Ltd are the data controllers and are responsible for your personal data (collectively referred to as the &quot;Company&quot;, &quot;we&quot;, &quot;us&quot; or &quot;our&quot; in this Policy). This means that we are responsible for deciding how we hold and use personal information about you. Little Star Media Limited is a company registered in the United Kingdom with company number 5957310. It&apos;s a Good Choice Ltd is a company registered in the United Kingdom with company number 16175846. Both registered offices are at Suite 478-480, Exchange House, 450 Midsummer Boulevard, Milton Keynes, MK9 2EA.</p>
                            <p>We have appointed a data protection officer (&quot;DPO&quot;), Caroline Sugrue. The DPO is responsible for overseeing the implementation of this Policy and for monitoring compliance with the GDPR and other applicable data protection legislation. If you have any questions about this Policy, including any requests to exercise your legal rights, please contact the DPO at: privacy@littlestarmedia.com</p>
                            <p>You have the right to make a complaint at any time to the Information Commissioner&apos;s Office (ICO), the UK supervisory authority for data protection issues (www.ico.org.uk). We would, however, appreciate the chance to deal with your concerns before you approach the ICO so please contact us in the first instance. We will always work hard to resolve any concern you may have.</p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <h2 className="text-lg font-bold">3. Your Rights</h2>
                            <p>Under data protection legislation, you have rights we need to make you aware of. The GDPR sets out the following rights applicable to you (please refer to the parts of this policy indicated for further details):</p>
                            <ul className="flex flex-col gap-1 pl-4">
                                <li>3.1 The right to be informed (Part 9);</li>
                                <li>3.2 The right of access (Part 10);</li>
                                <li>3.3 The right to rectification (Part 11);</li>
                                <li>3.4 The right to erasure (also known as the &apos;right to be forgotten&apos;) (Part 12);</li>
                                <li>3.5 The right to opt out (Part 13);</li>
                                <li>3.6 The right to restrict processing (Part 14);</li>
                                <li>3.7 The right to data portability (Part 15); and</li>
                                <li>3.8 The right to object (Part 16).</li>
                            </ul>
                            <p>If you wish to exercise any of the rights set out above, please contact our DPO.</p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <h2 className="text-lg font-bold">4. The Data We Collect About You</h2>
                            <p>The GDPR defines &quot;personal data&quot; as any information relating to an identified or identifiable natural person; an identifiable natural person is one who can be identified, directly or indirectly, in particular by reference to an identifier such as a name, an identification number, location data, an online identifier, or to one or more factors specific to the physical, physiological, genetic, mental, economic, cultural, or social identity of that natural person. It does not include data where the identity has been removed.</p>

                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse text-sm">
                                    <thead>
                                        <tr className="border-b border-outline-variant">
                                            <th className="text-left py-2 pr-4 font-bold w-1/4">Type of Data</th>
                                            <th className="text-left py-2 pr-4 font-bold w-1/2">Purpose of Data</th>
                                            <th className="text-left py-2 font-bold w-1/4">Lawful Basis</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-outline-variant align-top">
                                            <td className="py-3 pr-4">Identity Data including: name, user name or similar identifier, title, gender</td>
                                            <td className="py-3 pr-4">To identify you as a user so that we can provide services to you and communicate with you in connection with your registration at the Super Free Bingo website.</td>
                                            <td className="py-3">Consent</td>
                                        </tr>
                                        <tr className="border-b border-outline-variant align-top">
                                            <td className="py-3 pr-4">Contact Data including: Email Address, Mobile Phone Number</td>
                                            <td className="py-3 pr-4">We email gambling offers and newsletters to users who have consented to receive these. Users will normally receive emails up to 5 times per week, but on occasion this could be up to 6 times per week. Users may receive gambling offers and site information by SMS if they have consented to receive these. Users will normally receive SMS up to 5 times per week, but on occasion this could be up to 6 times per week. We will use contact information to update you about changes to our policies and terms and conditions. We also share your personal data with Facebook who help us show you relevant content and find similar users who might be interested in our services.</td>
                                            <td className="py-3">Consent. Necessary to comply with a legal obligation.</td>
                                        </tr>
                                        <tr className="border-b border-outline-variant align-top">
                                            <td className="py-3 pr-4">IP Address</td>
                                            <td className="py-3 pr-4">Used as a factor to determine robot behaviour and detect malicious or suspicious software.</td>
                                            <td className="py-3">Necessary for our legitimate interests which is to ensure our website is not used by machine learning tools or other non-human actors.</td>
                                        </tr>
                                        <tr className="border-b border-outline-variant align-top">
                                            <td className="py-3 pr-4">Geographic Location</td>
                                            <td className="py-3 pr-4">Used to determine fraudulent robot behaviour and to detect whether you are eligible to use our website.</td>
                                            <td className="py-3">Necessary for our legitimate interests which is to ensure our website is not used by machine learning tools or other non-human actors.</td>
                                        </tr>
                                        <tr className="border-b border-outline-variant align-top">
                                            <td className="py-3 pr-4">Technical Data including: Device Screen Size, Device Type, Browser Information, Preferred Language</td>
                                            <td className="py-3 pr-4">
                                                <p className="font-bold mb-1">Hotjar</p>
                                                <p className="mb-3">We use Hotjar in order to better understand our users&apos; needs and to optimise this service and experience. Hotjar uses cookies and other technologies to collect data on our users&apos; behaviour and their devices (in particular, device IP address (captured and stored only in anonymised form), device screen size, device type (unique device identifiers), browser information, geographic location (country only), and preferred language on our website). Hotjar stores this information in a pseudonymised user profile. Opt-out: https://www.hotjar.com/legal/compliance/opt-out</p>
                                                <p className="font-bold mb-1">Cookies and Analytics</p>
                                                <p className="mb-3">We use Google Analytics on this website. We (and third-party vendors including Google) use first-party cookies (such as the Google Analytics cookie) and third-party cookies (such as the DoubleClick cookie) together to inform, optimise, and serve ads based on past customer visits to our website. Opt-out: https://tools.google.com/dlpage/gaoptout</p>
                                                <p className="font-bold mb-1">How we use cookies</p>
                                                <p>A cookie helps us, for example, to analyse web traffic or lets us know when you visit a particular site. We use traffic log cookies to identify which pages are being used. This helps us analyse data about webpage traffic and improve our website in order to tailor it to customer needs. We only use this information for statistical analysis purposes and then the data is removed from the system.</p>
                                            </td>
                                            <td className="py-3">Consent. Necessary for our legitimate interests for the provision of administration and IT services and to study how users use our products.</td>
                                        </tr>
                                        <tr className="align-top">
                                            <td className="py-3 pr-4">Analytics Data</td>
                                            <td className="py-3 pr-4">We use analytics data to improve our website, products/services, marketing, and user experience.</td>
                                            <td className="py-3">Necessary for our legitimate interests (to study how users use our products, to develop them, to grow our business, and to inform our marketing strategy).</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <p>We do not collect any special categories of personal data about you (this includes details about your race or ethnicity, religious or philosophical beliefs, sex life, sexual orientation, political opinions, trade union membership, information about your health, and genetic and biometric data). Nor do we collect any information about criminal convictions and offences.</p>
                            <p>We collect and process the personal data set out above in the following ways:</p>
                            <ul className="flex flex-col gap-1 pl-4">
                                <li>4.1 directly from you for example through correspondence with you, creation of an account, subscriptions and use of our website;</li>
                                <li>4.2 via software, automated technologies or interactions with our website (we collect data using cookies and other similar technologies); and</li>
                                <li>4.3 via third parties.</li>
                            </ul>
                            <p>You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly.</p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <h2 className="text-lg font-bold">5. How We Use Your Personal Data</h2>
                            <p>We will only use your personal data when the law allows us to do so. Most commonly, we will use your personal information in the following circumstances:</p>
                            <ul className="flex flex-col gap-1 pl-4">
                                <li>5.1.1 you have given consent to the processing of your personal data for one or more specific purposes;</li>
                                <li>5.1.2 where we need to perform the contract we have entered into with you;</li>
                                <li>5.1.3 for compliance with a legal obligation;</li>
                                <li>5.1.4 to protect your interests (or someone else&apos;s interests); or</li>
                                <li>5.1.5 for our legitimate interests (or those of a third party), except where such interests are overridden by your fundamental rights and freedoms.</li>
                            </ul>
                            <p>We may share your personal data with third parties and the third parties to whom we may choose to sell, transfer or merge parts of our business or our assets. We require all third parties to respect the security of your personal data and to treat it in accordance with the law. We do not allow our third-party service providers to use your personal data for their own purposes and only permit them to process your personal data for specified purposes and in accordance with our instructions.</p>
                            <p>We may share your personal data with the following third parties:</p>
                            <ul className="flex flex-col gap-1 pl-4">
                                <li>5.1 service providers (including marketing and digital analytics) such as Hotjar, Reportdash, Mozenda, Microsoft, Google Analytics, Acoustic L.P, Voodoo, Zapier, AWS, Twilio, Cake, Digital Ocean, Reactful Inc., Bulk SMS Limited, Accelerize Inc. and Facebook, WhatsApp;</li>
                                <li>5.2 advertising networks;</li>
                                <li>5.3 search information providers;</li>
                                <li>5.4 banks and payment providers;</li>
                                <li>5.5 professional advisers; and</li>
                                <li>5.6 UK law enforcement agencies.</li>
                            </ul>
                            <p>You can ask us or third parties to stop sending you marketing messages at any time by following the opt-out links on any marketing message sent to you or by contacting us at any time. Where you opt out of receiving these marketing messages, this will not apply to our processing of your personal data that we process for non-marketing purposes.</p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <h2 className="text-lg font-bold">6. Accuracy of Data and Keeping Data Up-to-Date</h2>
                            <p>It is important that the personal data we hold about you is accurate and current. Please keep us informed if your personal data changes during your relationship with us. You have the right to request the rectification of personal data that we hold about you, as set out in Part 11, below.</p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <h2 className="text-lg font-bold">7. Data Retention</h2>
                            <p>We shall not keep your personal data for any longer than is necessary in light of the purpose or purposes for which that personal data was originally collected, held, and processed. We may retain your personal data for a longer period in the event of a complaint or if we reasonably believe there is a prospect of litigation in respect to our relationship with you.</p>
                            <p>If you are an active user, we will retain your personal data for the entire time that you are actively engaging with our site or products and for a further period of 6 months from the date of your last engagement. After that you will become an inactive user and we will put you onto a soft suppression list for a period of 2 years, following which we will erase your details.</p>
                            <p>If you request to no longer receive direct marketing from us, we will place your details onto a hard suppression list, where it will not be used, and you will be deleted from that hard suppression list at the end of 5 years.</p>
                            <p>If you require any information or have any data requests, you can contact our DPO, Caroline Sugrue, at: privacy@littlestarmedia.com</p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <h2 className="text-lg font-bold">8. Secure Processing</h2>
                            <p>We have put in place appropriate security measures to prevent your personal data against unauthorised or unlawful processing and against accidental loss, destruction, or damage. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know. They will only process your personal data on our instructions and they are subject to a duty of confidentiality.</p>
                            <p>We have put in place procedures to deal with any suspected personal data breach and will notify you and any applicable regulator of a breach where we are legally required to do so.</p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <h2 className="text-lg font-bold">9. Keeping You Informed</h2>
                            <p>Where your personal data is collected directly from you, you will be informed of its purpose at the time of collection.</p>
                            <p>Where your personal data is obtained from a third party, you will be informed of its purpose:</p>
                            <ul className="flex flex-col gap-1 pl-4">
                                <li>9.1 if the personal data is used to communicate with you, when the first communication is made;</li>
                                <li>9.2 if the personal data is to be transferred to another party, before that transfer is made; or</li>
                                <li>9.3 as soon as reasonably possible and in any event not more than one month after the personal data is obtained.</li>
                            </ul>
                        </div>

                        <div className="flex flex-col gap-3">
                            <h2 className="text-lg font-bold">10. Your Access Requests</h2>
                            <p>You may make subject access requests (&quot;SARs&quot;) at any time to find out more about the personal data which we hold about you and to check that we are lawfully processing it. If you wish to make a SAR, you should do so by emailing our DPO at privacy@littlestarmedia.com</p>
                            <p>Responses to SARs shall normally be made within one month of receipt. However, this may be extended by up to two months if the SAR is complex and/or numerous requests are made. If such additional time is required, you shall be informed.</p>
                            <p>We do not charge a fee for the handling of normal SARs. We reserve the right to charge reasonable fees for additional copies of information that has already been supplied to you, and for requests that are manifestly unfounded or excessive, particularly where such requests are repetitive.</p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <h2 className="text-lg font-bold">11. Rectification of Personal Data</h2>
                            <p>You have the right to require us to rectify any of your personal data that is inaccurate or incomplete.</p>
                            <p>Within one month of you making your request, we shall rectify the personal data in question, and inform you of the rectification. The period may be extended by up to two months in the case of complex requests. If such additional time is required, you shall be informed.</p>
                            <p>In the event that any affected personal data has been disclosed to third parties, those parties shall be informed of any rectification that must be made to that personal data.</p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <h2 className="text-lg font-bold">12. Erasure of Personal Data</h2>
                            <p>You have the right to request that we erase your personal data in the following circumstances:</p>
                            <ul className="flex flex-col gap-1 pl-4">
                                <li>12.1 It is no longer necessary for us to process your personal data for the purpose(s) for which it was originally collected;</li>
                                <li>12.2 You no longer wish us to process your personal data;</li>
                                <li>12.3 Your personal data has been processed unlawfully; or</li>
                                <li>12.4 Your personal data needs to be erased in order for us to comply with a particular legal obligation.</li>
                            </ul>
                            <p>Unless we have reasonable grounds to refuse to erase your personal data, we will comply with all requests for erasure and inform you when this has been done within one month of receipt of your request. The period can be extended by up to two months in the case of complex requests. If such additional time is required, we will inform you.</p>
                            <p>In the event that your personal data to be erased has been disclosed to third parties, we will inform those parties of the erasure (unless it is impossible or would require disproportionate effort to do so).</p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <h2 className="text-lg font-bold">13. Marketing Communications</h2>
                            <p>You can withdraw your consent to receiving marketing communications from us at any time by unsubscribing from our database.</p>
                            <p>If you wish to unsubscribe from this service, please click the &apos;Unsubscribe&apos; link in any email that you have received from us.</p>
                            <p>To unsubscribe from receiving SMS messages please click on the opt-out link provided to you in the SMS you have received, enter the telephone number you wish to opt out in the onscreen box, and click &quot;I&apos;m sure I want to leave&quot;.</p>
                            <p>Alternatively, you can contact us via the &apos;Contact us&apos; link at the bottom of the site or by emailing privacy@littlestarmedia.com, using the subject line &quot;Unsubscribe&quot; and providing your name, as well as the email address and mobile number that you signed up with.</p>
                            <p>Please allow up to 28 days for your request to be processed.</p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <h2 className="text-lg font-bold">14. Restriction of Personal Data Processing</h2>
                            <p>You may request that we cease processing the personal data we hold about you. If you make such a request, we shall retain only the amount of your personal data (if any) that is necessary to ensure that the personal data in question is not processed further.</p>
                            <p>In the event that any affected personal data has been disclosed to third parties, those parties shall be informed of the applicable restrictions on processing it (unless it is impossible or would require disproportionate effort to do so).</p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <h2 className="text-lg font-bold">15. Data Portability</h2>
                            <p>Where you have given your consent to us to process your personal data in such a manner, or the data is otherwise required for the performance of a contract between us, you have the right, under the GDPR, to request that we transfer your personal data.</p>
                            <p>To facilitate the right of data portability, we will make available all your applicable personal data to you as a .csv file via email. Where technically feasible, if requested by you, your personal data shall be sent directly to the required data controller.</p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <h2 className="text-lg font-bold">16. Objections to Personal Data Processing</h2>
                            <p>You have the right to object to us processing your personal data where we are relying on legitimate interests and there is something about your particular situation which makes you want to object to processing on this ground as you feel it impacts on your fundamental rights and freedoms. You also have the right to object where we are processing your personal data for direct marketing purposes. In some limited cases, we may demonstrate that we have compelling legitimate grounds to process your information which override your rights and freedoms.</p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <h2 className="text-lg font-bold">17. Transferring Personal Data to a Country Outside the EEA</h2>
                            <p>We may from time to time transfer personal data to external third parties outside the EEA.</p>
                            <p>The transfer of personal data to a country outside of the EEA shall take place only if one or more adequacy measures as summarised in the GDPR apply. For the purposes of your data, this is likely to be the following:</p>
                            <ul className="flex flex-col gap-1 pl-4">
                                <li>17.1 the transfer is to a country, territory, or one or more specific sectors in that country (or an international organisation), that the European Commission has determined ensures an adequate level of protection for personal data; or</li>
                                <li>17.2 the transfer is to a country (or international organisation) which provides appropriate safeguards in the form of a legally binding agreement between public authorities or bodies; binding corporate rules; standard data protection clauses adopted by the European Commission; compliance with an approved code of conduct approved by a supervisory authority (e.g. the Information Commissioner&apos;s Office); certification under an approved certification mechanism (as provided for in the GDPR); contractual clauses agreed and authorised by the competent supervisory authority; or provisions inserted into administrative arrangements between public authorities or bodies authorised by the competent supervisory authority.</li>
                            </ul>
                            <p>Please contact us if you want further information on the specific mechanism used by us when transferring your personal data out of the EEA.</p>
                        </div>

                    </div>
                </div>
            </section>

            <SfbFooter legalText={settings.footerLegalText} />
        </main>
    );
}
