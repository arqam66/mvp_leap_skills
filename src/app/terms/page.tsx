import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Leap Skills',
  description: 'Read Leap Skills terms and conditions that govern your use of our platform, services, and courses.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-24">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
            Terms &amp; Conditions
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Last updated: July 13, 2026
          </p>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-8 md:p-12 space-y-10">
          <section>
            <h2 className="font-headline text-xl font-bold text-slate-900 dark:text-white mb-4">1. Agreement to Terms</h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              By accessing or using the Leap Skills platform (&quot;Platform&quot;), operated by Leap Skills (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), you agree to be bound by these Terms &amp; Conditions (&quot;Terms&quot;). If you disagree with any part of these terms, you may not access or use the Platform.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-bold text-slate-900 dark:text-white mb-4">2. Description of Services</h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              Leap Skills is a career-readiness and skill-building platform that provides practical learning, real-world projects, expert mentorship, and professional development programs. Our services include but are not limited to online courses, mentor-guided training, career coaching, and access to partner networks.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-bold text-slate-900 dark:text-white mb-4">3. User Accounts</h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
              When you create an account with us, you must provide accurate, complete, and current information. You are responsible for:
            </p>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 text-sm leading-relaxed space-y-2 ml-2">
              <li>Maintaining the confidentiality of your account and password</li>
              <li>Restricting access to your computer or device</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized use of your account</li>
            </ul>
          </section>

          <section>
            <h2 className="font-headline text-xl font-bold text-slate-900 dark:text-white mb-4">4. Intellectual Property Rights</h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              The Platform and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, audio, design, and the arrangement thereof) are owned by Leap Skills, its licensors, or other providers and are protected by copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-bold text-slate-900 dark:text-white mb-4">5. User Content</h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
              By posting, submitting, or uploading content to the Platform, you grant Leap Skills a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and distribute your content in connection with our services. You represent and warrant that:
            </p>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 text-sm leading-relaxed space-y-2 ml-2">
              <li>You own or have the right to post the content</li>
              <li>The content does not violate the rights of any third party</li>
              <li>The content does not contain any unlawful, harmful, or objectionable material</li>
            </ul>
          </section>

          <section>
            <h2 className="font-headline text-xl font-bold text-slate-900 dark:text-white mb-4">6. Prohibited Uses</h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
              You agree not to use the Platform:
            </p>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 text-sm leading-relaxed space-y-2 ml-2">
              <li>For any unlawful purpose or in violation of any applicable laws</li>
              <li>To exploit, harm, or attempt to exploit or harm minors</li>
              <li>To transmit any advertising or promotional material without prior consent</li>
              <li>To impersonate or attempt to impersonate Leap Skills, an employee, or another user</li>
              <li>To engage in any activity that interferes with or disrupts the Platform</li>
              <li>To scrape, data mine, or use automated means to access the Platform without authorization</li>
              <li>To upload or transmit viruses, malware, or any other harmful code</li>
            </ul>
          </section>

          <section>
            <h2 className="font-headline text-xl font-bold text-slate-900 dark:text-white mb-4">7. Payments and Refunds</h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              Certain features of the Platform may require payment. All payments are processed securely through our third-party payment providers. Prices are subject to change with reasonable notice. Refund policies may vary by course or service. Please review the specific refund terms before making a purchase. If you are unsatisfied with a purchase, contact us within 7 days for assistance.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-bold text-slate-900 dark:text-white mb-4">8. Disclaimer of Warranties</h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              The Platform is provided on an &quot;as is&quot; and &quot;as available&quot; basis without any warranties of any kind, either express or implied. We do not warrant that the Platform will be uninterrupted, error-free, or free of viruses or other harmful components. We make no guarantees regarding employment outcomes, career advancement, or specific results from using our services.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-bold text-slate-900 dark:text-white mb-4">9. Limitation of Liability</h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              In no event shall Leap Skills, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, or goodwill, resulting from your access to or use of (or inability to access or use) the Platform.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-bold text-slate-900 dark:text-white mb-4">10. Termination</h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              We may terminate or suspend your account and access to the Platform immediately, without prior notice or liability, for any reason, including but not limited to a breach of these Terms. Upon termination, your right to use the Platform will cease immediately. All provisions of these Terms that should survive termination shall survive.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-bold text-slate-900 dark:text-white mb-4">11. Governing Law</h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of Pakistan, without regard to its conflict of law provisions. Any disputes arising from these Terms shall be resolved in the courts of Karachi, Sindh, Pakistan.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-bold text-slate-900 dark:text-white mb-4">12. Changes to Terms</h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days&apos; notice prior to any new terms taking effect. Continued use of the Platform after any changes constitutes your acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-bold text-slate-900 dark:text-white mb-4">13. Contact Us</h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              If you have any questions about these Terms &amp; Conditions, please contact us at:
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
