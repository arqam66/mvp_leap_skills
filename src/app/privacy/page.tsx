import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Leap Skills',
  description: 'Read Leap Skills privacy policy to understand how we collect, use, and protect your personal information.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-24">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Last updated: July 13, 2026
          </p>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-8 md:p-12 space-y-10">
          <section>
            <h2 className="font-headline text-xl font-bold text-slate-900 dark:text-white mb-4">1. Introduction</h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              Welcome to Leap Skills (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <strong>leapskills.sbs</strong> and use our services.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-bold text-slate-900 dark:text-white mb-4">2. Information We Collect</h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
              We may collect the following types of information:
            </p>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 text-sm leading-relaxed space-y-2 ml-2">
              <li><strong>Personal Information:</strong> Name, email address, phone number, and other contact details you provide when creating an account or joining our waitlist.</li>
              <li><strong>Profile Information:</strong> Educational background, skills, career interests, and other profile details you choose to share.</li>
              <li><strong>Usage Data:</strong> Information about how you use our platform, including pages visited, time spent, courses accessed, and interaction patterns.</li>
              <li><strong>Device Information:</strong> Browser type, IP address, device type, operating system, and other technical data collected automatically.</li>
              <li><strong>Cookies and Tracking:</strong> We use cookies and similar tracking technologies to improve your experience and analyze platform usage.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-headline text-xl font-bold text-slate-900 dark:text-white mb-4">3. How We Use Your Information</h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 text-sm leading-relaxed space-y-2 ml-2">
              <li>Provide, operate, and maintain our services and platform</li>
              <li>Improve, personalize, and expand our offerings</li>
              <li>Communicate with you about courses, updates, promotions, and support</li>
              <li>Process your transactions and manage your account</li>
              <li>Analyze usage trends to enhance user experience</li>
              <li>Comply with legal obligations and protect our rights</li>
            </ul>
          </section>

          <section>
            <h2 className="font-headline text-xl font-bold text-slate-900 dark:text-white mb-4">4. Information Sharing</h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              We do not sell your personal information. We may share your data with trusted third-party service providers who assist us in operating our platform, conducting our business, or servicing you, provided they agree to keep this information confidential. We may also disclose your information when required by law or to protect our rights.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-bold text-slate-900 dark:text-white mb-4">5. Data Security</h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-bold text-slate-900 dark:text-white mb-4">6. Your Rights</h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
              Depending on your location, you may have the following rights regarding your personal data:
            </p>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 text-sm leading-relaxed space-y-2 ml-2">
              <li>Access and receive a copy of your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your personal data</li>
              <li>Object to or restrict processing of your data</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="font-headline text-xl font-bold text-slate-900 dark:text-white mb-4">7. Cookies</h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              Our platform uses cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie preferences through your browser settings. Disabling cookies may limit some features of our platform.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-bold text-slate-900 dark:text-white mb-4">8. Third-Party Links</h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              Our platform may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-bold text-slate-900 dark:text-white mb-4">9. Children&apos;s Privacy</h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              Our services are not directed to individuals under the age of 13. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us and we will take steps to remove that information.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-bold text-slate-900 dark:text-white mb-4">10. Changes to This Policy</h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date. We encourage you to review this policy periodically.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-bold text-slate-900 dark:text-white mb-4">11. Contact Us</h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              If you have any questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-900 dark:text-white font-medium">Leap Skills</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Email:{' '}
                <a href="mailto:info@leapskills.sbs" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                  info@leapskills.sbs
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
