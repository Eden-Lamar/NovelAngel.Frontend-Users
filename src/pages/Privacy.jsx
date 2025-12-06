import { Link } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";

const Section = ({ title, children }) => (
  <div className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-8 last:border-0">
    <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 font-vibes-secondary">
      {title}
    </h3>
    <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-4 text-[15px] md:text-base">
      {children}
    </div>
  </div>
);

const Privacy = () => {


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f1419] py-6 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-6 text-center space-y-2">
            <Link to="/" className="inline-flex items-center gap-2 text-gold hover:text-cyan-500 transition-colors text-sm font-medium">
                <IoArrowBack /> Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl py-1.5 font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold to-cyan-500 font-vibes">
                Privacy Policy
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
                Your privacy matters to us.
            </p>
        </div>

        {/* Content Container */}
        <div className="bg-white dark:bg-[#1a1b23] rounded-2xl shadow-xl p-6 md:p-12 border border-gray-100 dark:border-gray-800/50 text-justify">
            
            <Section title="1. Introduction & Data Collection">
                <p>
                    The following webpage outlines NovelAngel’s collection and use of personal information from its users. 
                    NovelAngel.com values the privacy of our members and users, we will never share any personal information 
                    of anybody who logs on to NovelAngel with anyone. This includes your e-mail address, name, and location. 
                </p>
                <p>
                    Upon logging on to NovelAngel such things as your IP address and hostname are logged for statistical and security reasons.
                </p>
            </Section>

            <Section title="2. Children’s Privacy">
                <p>
                    NovelAngel does not knowingly collect personal data from children under the age of 13. We make reasonable efforts 
                    to prevent someone who is underage from joining as a member of NovelAngel, and will not collect information from them. 
                    If NovelAngel learns that a child under the age of 13 has become a member, we will close that child’s account and 
                    delete any information collected about the child.
                </p>
                <p>
                    Notwithstanding the foregoing, NovelAngel may choose to retain some personal information such as the child’s e-mail 
                    address as a means to prevent the child from re-registering at our website. The Children’s Online Privacy Protection 
                    Act (COPPA) went into effect in April 2000, and as a result websites all over the world wide web had to change 
                    their standards to not collect any information from a child.
                </p>
            </Section>

            <Section title="3. Disclosing Information">
                <p>
                    NovelAngel may store and disclose personal information allowed or required by applicable law or when deemed advisable by us. 
                    This means that we may make disclosures that are necessary to conform to legal and regulatory requirements or processes 
                    and to protect the rights, safety, and property of NovelAngel, users of the NovelAngel website, and the public.
                </p>
            </Section>

            <Section title="4. Security">
                <p>
                    At NovelAngel we make reasonable efforts to protect personal information such as passwords and use technology such as 
                    encryption, access control procedures, firewalls, and physical security. We urge you to use a unique password with 
                    both letters and numbers to protect your account on NovelAngel and its affiliated websites. 
                </p>
                <p>
                    If others, including family, friends or other household members access and use your account through your login credentials, 
                    you are responsible for the actions of that individual. Only in extreme cases will your account be fully terminated.
                </p>
            </Section>

            <Section title="5. Third Parties">
                <p>
                    Third Party websites may collect information from users of NovelAngel, this information will include your IP address, 
                    hostname, and information about your system to help us serve you better. These are purely used for statistical reasons, 
                    and will not be used in any way other than that. Some programs that may collect this information include: Google, Jetpack, WordPress.
                </p>
                <p>
                    We use Local Storage to securely store your session token and interface preferences. We may also use essential cookies provided by our hosting partners for security and performance.
                </p>
            </Section>

            <Section title="6. Website Policy Changes">
                <p>
                    NovelAngel reserves the right to change this and any other policy located on our website at any time without notifying our users.
                </p>
            </Section>
            
            <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                 <p className="text-sm text-gray-500">
                    Questions? Contact us at <a href="mailto:novelangel@gmail.com" className="text-cyan-500 hover:text-gold transition-colors">novelangel@gmail.com</a>
                 </p>
            </div>

        </div>
      </div>
    </div>
  );
};

export default Privacy;