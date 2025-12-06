import { Link } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";

const Section = ({ title, children }) => (
  <div className="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8 last:border-0 last:pb-0">
    <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 font-vibes-secondary">
      {title}
    </h3>
    <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-4 text-[15px] md:text-base">
      {children}
    </div>
  </div>
);

const Terms = () => {

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f1419] py-6 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-6 text-center space-y-2">
            <Link to="/" className="inline-flex items-center gap-2 text-gold hover:text-cyan-500 transition-colors text-sm font-medium">
                <IoArrowBack /> Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl py-1.5 font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold to-cyan-500 font-vibes">
                Terms and Conditions
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
                Last updated: {new Date().toLocaleDateString()}
            </p>
        </div>

        {/* Content Container */}
        <div className="bg-white dark:bg-[#1a1b23] rounded-2xl shadow-xl p-6 md:p-12 border border-gray-100 dark:border-gray-800/50 text-justify">
            
            <Section title="1. Introduction">
                <p>Welcome to NovelAngel. These Terms and Conditions outline the rules and guidelines for using our website, and related services. These Terms and Conditions act as the Terms of Use of the NovelAngel Website. By registering, browsing, or interacting with NovelAngel, you agree to follow the terms outlined below. If you do not agree with them, please do not use our platform. These terms may be updated from time to time. We will notify you of any material changes by updating this Terms and Conditions. You should consult this Terms and Conditions regularly for any changes.</p>
            </Section>

            <Section title="2. Your Acceptance">
                <p className="uppercase font-semibold text-xs md:text-sm tracking-wide">
                    BY USING AND/OR VISITING THIS WEBSITE (COLLECTIVELY, INCLUDING ALL CONTENT AVAILABLE THROUGH THE NOVELANGEL.COM DOMAIN NAME, THE “NOVELANGEL WEBSITE”, OR “WEBSITE”), YOU SIGNIFY YOUR ASSENT TO TERMS OF USE, WHICH ARE PUBLISHED AT HTTPS://WWW.NOVELANGEL.COM/TERMS AND WHICH ARE INCORPORATED HEREIN BY REFERENCE.
                </p>
                <p>If you do not agree to any of these terms, then please do not use the NovelAngel Website.</p>
            </Section>

            <Section title="3. Definitions">
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Service:</strong> Refers to the NovelAngel website operated by NovelAngel.</li>
                    <li><strong>User:</strong> Refers to the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service.</li>
                    <li><strong>Content:</strong> Refers to novels, chapters, reviews, comments, and other material available through the Service.</li>
                    <li><strong>Coins:</strong> Refers to the virtual currency used within the Service.</li>
                </ul>
            </Section>

            <Section title="4. Account Registration">
                <p>To access certain features of NovelAngel, such as saving your reading progress, purchasing content, or posting reviews, you must create an account. We require a valid email address and password. Passwords are stored securely in hashed form.</p>
                <p>Users are responsible for all activities that occur under their account. Please keep your login credentials confidential and notify us immediately of any unauthorized use.</p>
            </Section>

            <Section title="5. Content and Refund Policy">
                <p>Some chapters on our platform are free, while others can be unlocked using Coins – our virtual currency.</p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Coins can be purchased with debit cards using real money.</li>
                    <li>They are non-refundable and hold no cash value outside NovelAngel.</li>
                    <li>Coins cannot be exchanged, gifted, or transferred.</li>
                </ul>
            </Section>

            <Section title="6. Coins and Purchases">
                <p>Coins are a virtual currency that can be used to purchase chapters and other content on the Service. Coins have no real-world value and cannot be exchanged for cash or other items of monetary value from us or any other party except as explicitly provided in these Terms.</p>
                <p>All purchases of Coins are final and non-refundable, except as required by applicable law. We reserve the right to modify, manage, control and/or eliminate Coins at our sole discretion. Prices and availability of Coins are subject to change without notice.</p>
            </Section>

            <Section title="7. NovelAngel Website">
                <p>These Terms of Use apply to all users of the NovelAngel Website, including users who are also contributors of novel content, information, and other materials or services on the Website. The NovelAngel Website may contain links to third party websites that are not owned or controlled by NovelAngel. NovelAngel has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party websites. In addition, NovelAngel will not and cannot censor or edit the content of any third-party site. By using the Website, you expressly relieve NovelAngel from any and all liability arising from your use of any third-party website. Accordingly, we encourage you to be aware when you leave the NovelAngel Website and to read the terms and conditions and privacy policy of each other website that you visit.</p>
            </Section>

            <Section title="8. Website Access">
                <p><strong>A.</strong> NovelAngel hereby grants you permission to use the Website as set forth in this Terms of Use, provided that:</p>
                <ul className="pl-5 space-y-2 mt-2">
                    <li>(i) Your use of the Website as permitted is solely for your personal, noncommercial use;</li>
                    <li>(ii) You will not copy or distribute any part of the Website in any medium without NovelAngel’s prior written authorization;</li>
                    <li>(iii) You will not alter or modify any part of the Website;</li>
                    <li>(iv) You will otherwise comply with the terms and conditions as outlined.</li>
                </ul>
                <p className="mt-4"><strong>B.</strong> In order to access some features of the Website, you will have to create an account. You may never use another user’s account without permission. When creating your account, you must provide accurate and complete information. You are solely responsible for the activity that occurs on your account, and you must keep your account password secure. You must notify NovelAngel immediately of any breach of security or unauthorized use of your account. Although NovelAngel will not be liable for your losses caused by any unauthorized use of your account, you may be liable for the losses of NovelAngel or others due to such unauthorized use.</p>
                <p className="mt-4"><strong>C.</strong> You agree not to use or launch any automated system, including without limitation, “robots,” “spiders,” “offline readers,” etc., that accesses the Website in a manner that sends more request messages to the NovelAngel servers in a given period of time than a human can reasonably produce in the same period by using a convention on-line web browser. Notwithstanding the foregoing, NovelAngel explicitly grants the operators of public search engines permission to use spiders to copy materials from the site for the sole purpose of creating publicly available searchable indices of the materials, but not caches or archives of such materials. NovelAngel reserves the right to revoke these exceptions either generally or in specific cases. You agree not to collect or harvest any personally identifiable information, including account names, from the Website, nor to use the communication systems provided by the Website for any commercial solicitation purposes. You agree not to solicit, for commercial purposes, any users of the Website with respect to their User Submissions.</p>
            </Section>

            <Section title="9. User Submissions">
                <p><strong>A.</strong> The NovelAngel Website may now or in the future permit the submission of novel or other communications submitted by you and other users (“User Submissions”) and the hosting, sharing, and/or publishing of such User Submissions. You understand that whether or not such User Submissions are published, NovelAngel does not guarantee any confidentiality with respect to any submissions.</p>
                
                <p><strong>B.</strong> You shall be solely responsible for your own User Submissions and the consequences of posting or publishing them. In connection with User Submissions, you affirm, represent, and/or warrant that:</p>
                <ul className="pl-5 space-y-2 mt-2">
                    <li>(i) You own or have the necessary licenses, rights, consents, and permissions to use and authorize NovelAngel to use all patent, trademark, trade secret, copyright or other proprietary rights in and to any and all User Submissions to enable inclusion and use of the User Submissions in the manner contemplated by the Website and these Terms of Use;</li>
                    <li>(ii) You retain all of your ownership rights in your User Submissions. However, by submitting the User Submissions to NovelAngel, you hereby grant NovelAngel a worldwide, non-exclusive, royalty-free, sublicense-able and transferable license to use, reproduce, distribute, prepare derivative works of, display, and perform the User Submissions in connection with the NovelAngel Website and NovelAngel’s (and its successor’s) business, including without limitation for promoting and redistributing part or all of the NovelAngel Website (and derivative works thereof) in any media formats and through any media channels. You also hereby grant each user of the NovelAngel Website a non-exclusive license to access your User Submissions through the Website, and to use, reproduce, distribute, prepare derivative works of, display and perform such User Submissions as permitted through the functionality of the Website and under these Terms of Use. The foregoing license granted by you terminates once you remove or delete a User Submission from the NovelAngel Website.</li>
                </ul>

                <p className="mt-4"><strong>C.</strong> In connection with User Submissions, you further agree that you will not:</p>
                <ul className="pl-5 space-y-2 mt-2">
                    <li>(i) Submit material that is copyrighted, protected by trade secret or otherwise subject to third party proprietary rights, including privacy and publicity rights, unless you are the owner of such rights or have permission from their rightful owner to post the material and to grant NovelAngel all of the license rights granted herein;</li>
                    <li>(ii) Publish falsehoods or misrepresentations that could damage NovelAngel or any third party;</li>
                    <li>(iii) Submit material that is unlawful, obscene, defamatory, libelous, threatening, pornographic, harassing, hateful, racially or ethnically offensive, or encourages conduct that would be considered a criminal offense, give rise to civil liability, violate any law, or is otherwise inappropriate;</li>
                    <li>(iv) Post advertisements or solicitations of business;</li>
                </ul>

                <div className="mt-4">
                    <p><strong>D.</strong> In particular, if you are a copyright owner or an agent thereof and believe that any User Submission or other content infringes upon your copyrights, you may submit a notification pursuant to the Digital Millennium Copyright Act (“DMCA”) by providing our Copyright Agent with the following information in writing (see 17 U.S.C 512(c)(3) for further detail):</p>
                    <ul className="pl-5 space-y-2 mt-2">
                        <li>(i) A physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed;</li>
                        <li>(ii) Identification of the copyrighted work claimed to have been infringed, or, if multiple copyrighted works at a single online site are covered by a single notification, a representative list of such works at that site;</li>
                        <li>(iii) Identification of the material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed or access to which is to be disabled and information reasonably sufficient to permit the service provider to locate the material;</li>
                        <li>(iv) Information reasonably sufficient to permit the service provider to contact you, such as an address, telephone number, and, if available, an electronic mail;</li>
                        <li>(v) A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law;</li>
                        <li>(vi) A statement that the information in the notification is accurate, and under penalty of perjury, that you are authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
                    </ul>
                    <p className="mt-2 p-4 text-sm bg-gray-50 dark:bg-gray-900 rounded-lg border-[1px] border-gray-700">
                        NovelAngel’s designated Copyright Agent to receive notifications of claimed infringement is: <strong className="text-cyan-600 dark:text-cyan-400">copyright@novelangel.com</strong>. <br/>
                        <span className="text-sm">For clarity, only DMCA notices should go to the Copyright Agent; any other feedback, comments, requests for technical support, and other communications should be directed to NovelAngel customer service. You acknowledge that if you fail to comply with all of the requirements of this Section 5(D), your DMCA notice may not be valid.</span>
                    </p>
                </div>

                <p className="mt-4"><strong>E.</strong> You understand that when using the NovelAngel Website, you will be exposed to User Submissions from a variety of sources, and that NovelAngel is not responsible for the accuracy, usefulness, safety, or intellectual property rights of or relating to such User Submissions. You further understand and acknowledge that you may be exposed to User Submissions that are inaccurate, offensive, indecent, or objectionable, and you agree to waive, and hereby do waive, any legal or equitable rights or remedies you have or may have against NovelAngel with respect thereto, and agree to indemnify and hold NovelAngel, its Owners/Operators, affiliates, and/or licensors, harmless to the fullest extent allowed by law regarding all matters related to your use of the site.</p>
                <p className="mt-4"><strong>F.</strong> NovelAngel permits you to link to materials on the Website for personal, non-commercial purposes only. NovelAngel reserves the right to discontinue any aspect of the NovelAngel Website at any time.</p>
            </Section>

            <Section title="10. Warranty Disclaimer">
                <p>You agree that your use of the NovelAngel website shall be at your sole risk. To the fullest extent permitted by law, NovelAngel, its officers, directors, employees, and agents disclaim all warranties, express or implied, in connection with the website and your use thereof. NovelAngel makes no warranties or representations about the accuracy or completeness of this site’s content or the content of any sites linked to this site and assumes no liability or responsibility for any:</p>
                <ul className="pl-5 space-y-2 mt-2">
                    <li>(i) Errors, mistakes, or inaccuracies of content,</li>
                    <li>(ii) Personal injury or property damage, of any nature whatsoever, resulting from your access to and use of our website,</li>
                    <li>(iii) Any unauthorized access to or use of our secure servers and/or any and all personal information and/or financial information stored therein,</li>
                    <li>(iv) Any interruption or cessation of transmission to or from our website,</li>
                    <li>(v) Any bugs, viruses, trojan horses, or the like which may be transmitted to or through our website by any third party,</li>
                    <li>(vi) Any errors or omissions in any content or for any loss or damage of any kind incurred as a result of the use of any content posted, emailed, transmitted, or otherwise made available via the NovelAngel website. NovelAngel does not warrant, endorse, guarantee, or assume responsibility for any product or service advertised or offered by a third party through the NovelAngel website or any hyperlinked website or featured in any banner or other advertising, and NovelAngel will not be a party to or in any way be responsible for monitoring any transaction between you and third-party providers of products or services. As with the purchase of a product or service through any medium or in any environment, you should use your best judgment and exercise caution where appropriate.</li>
                </ul>
            </Section>

            <Section title="11. Limitation of Liability">
                <p>In no event shall NovelAngel, its officers, directors, employees, or agents, be liable to you for any direct, indirect, incidental, special, punitive, or consequential damages whatsoever resulting from any:</p>
                <ul className="pl-5 space-y-2 mt-2">
                    <li>(i) Errors, mistakes, or inaccuracies of content,</li>
                    <li>(ii) Personal injury or property damage, of any nature whatsoever, resulting from your access to and use of our website,</li>
                    <li>(iii) Any unauthorized access to or use of our secure servers and/or any and all personal information and/or financial information stored therein,</li>
                    <li>(iv) Any interruption or cessation of transmission to or from our website, any bugs, viruses, trojan horses, or the like, which may be transmitted to or through our website by any third party,</li>
                    <li>(v) Any errors or omissions in any content or for any loss or damage of any kind incurred as a result of your use of any content posted, emailed, transmitted, or otherwise made available via the NovelAngel website, whether based on warranty, contract, tort, or any other legal theory, and whether or not the company is advised of the possibility of such damages. The foregoing limitation of liability shall apply to the fullest extent permitted by law in the applicable jurisdiction.</li>
                </ul>
                <p className="mt-4">You specifically acknowledge that NovelAngel shall not be liable for user submissions or the defamatory, offensive, or illegal conduct of any third party and that the risk of harm or damage from the foregoing rests entirely with you.</p>
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <p className="font-semibold mb-2">While we work hard to ensure a smooth and secure experience, NovelAngel cannot guarantee that the platform will always be error-free or uninterrupted. We are not liable for any damages arising from:</p>
                    <ul className="list-disc pl-5">
                        <li>Temporary outages or technical glitches.</li>
                        <li>Unauthorized use of your account.</li>
                        <li>Content inaccuracies or third-party content.</li>
                        <li>Loss of data, access, or virtual currency.</li>
                    </ul>
                    <p className="mt-2">By using our platform, you acknowledge these risks and agree to use the Service at your own discretion.</p>
                </div>
            </Section>

            <Section title="12. Indemnity">
                <p>You agree to defend, indemnify and hold harmless NovelAngel, its parent corporation, officers, directors, employees and agents, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney’s fees) arising from:</p>
                <ul className="pl-5 space-y-2 mt-2">
                    <li>(i) Your use of and access to the NovelAngel Website;</li>
                    <li>(ii) Your violation of any term of these Terms of Use;</li>
                    <li>(iii) Your violation of any third party right, including without limitation any copyright, property, or privacy right;</li>
                    <li>(iv) any claim that one of your User Submissions caused damage to a third party.</li>
                </ul>
                <p className="mt-2">This defense and indemnification obligation will survive these Terms and Conditions and your use of the NovelAngel Website.</p>
            </Section>

            <Section title="13. Ability to Accept Terms of Use">
                <p>You affirm that you are either more than 18 years of age, or an emancipated minor, or possess legal parental or guardian consent, and are fully able and competent to enter into the terms, conditions, obligations, affirmations, representations, and warranties set forth in these Terms of Service, and to abide by and comply with these Terms of Service. In any case, you affirm that you are over the age of 13, as the NovelAngel Website is not intended for children under 13. If you are under 13 years of age, then please do not use the NovelAngel Website.</p>
            </Section>

            <Section title="14. Assignment">
                <p>These Terms of Use, and any rights and licenses granted hereunder, may not be transferred or assigned by you, but may be assigned by NovelAngel without restriction.</p>
            </Section>

            <Section title="15. Termination">
                <p>We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.</p>
                <p className="mt-2">If you wish to terminate your account, you may simply discontinue using the Service, or notify us that you wish to delete your account via <a href="mailto:novelangel@gmail.com" className="text-cyan-500 hover:text-gold">novelangel@gmail.com</a></p>
            </Section>

            <Section title="16. Changes to Terms">
                <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
                <p className="mt-2">By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.</p>
            </Section>

            <Section title="17. Contact Us">
                <p>If you have any questions about these Terms, please contact us at <a href="mailto:novelangel@gmail.com" className="text-cyan-500 hover:text-gold transition-colors">novelangel@gmail.com</a></p>
            </Section>

        </div>
      </div>
    </div>
  );
};

export default Terms;