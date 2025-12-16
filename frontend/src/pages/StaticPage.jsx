import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const StaticPage = ({ title, contentKey }) => {
    const contentMap = {
        features: (
            <div className="space-y-6">
                <p>SafeLynx offers a comprehensive suite of features to secure your digital life.</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>AES-256 Encryption for all documents</li>
                    <li>Secure Sharing with granular permissions</li>
                    <li>AI-powered Summaries</li>
                    <li>Smart Categorization</li>
                    <li>Activity Logs and Auditing</li>
                </ul>
            </div>
        ),
        pricing: (
            <div className="space-y-6">
                <p className="text-center text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    Choose the plan that fits your needs. Upgrade anytime as your document collection grows.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                    {/* Free Plan */}
                    <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col hover:shadow-lg transition-all">
                        <div className="mb-4">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Free</h3>
                            <p className="text-sm text-slate-500">Individual basic users</p>
                        </div>
                        <div className="mb-6">
                            <p className="text-3xl font-bold text-slate-900 dark:text-white">₹0<span className="text-sm font-normal text-slate-500">/mo</span></p>
                            <p className="text-sm font-semibold text-indigo-600 mt-2">Up to 3 GB Storage</p>
                        </div>
                        <ul className="space-y-3 mb-8 flex-1 text-sm text-slate-600 dark:text-slate-300">
                            <li className="flex items-start gap-2">
                                <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                Secure document storage
                            </li>
                            <li className="flex items-start gap-2">
                                <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                Basic upload & preview
                            </li>
                            <li className="flex items-start gap-2">
                                <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                Manual categorization
                            </li>
                            <li className="flex items-start gap-2 opacity-50">
                                <svg className="w-5 h-5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                No priority support
                            </li>
                        </ul>
                        <button className="w-full py-2.5 rounded-lg border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-white dark:hover:border-indigo-500 transition-colors">
                            Get Started Free
                        </button>
                    </div>

                    {/* Advance Plan */}
                    <div className="relative p-6 rounded-2xl bg-indigo-50 dark:bg-indigo-900/10 border-2 border-indigo-500 flex flex-col hover:shadow-xl transition-all scale-105 z-10">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                            Most Popular
                        </div>
                        <div className="mb-4">
                            <h3 className="text-xl font-bold text-indigo-900 dark:text-white">Advance</h3>
                            <p className="text-sm text-indigo-600/80 dark:text-indigo-300">Students & professionals</p>
                        </div>
                        <div className="mb-6">
                            <p className="text-3xl font-bold text-slate-900 dark:text-white">₹50<span className="text-sm font-normal text-slate-500">/mo</span></p>
                            <p className="text-sm font-semibold text-indigo-600 mt-2">Up to 6 GB Storage</p>
                        </div>
                        <ul className="space-y-3 mb-8 flex-1 text-sm text-slate-700 dark:text-slate-200">
                            <li className="flex items-start gap-2">
                                <svg className="w-5 h-5 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                Everything in Free, plus:
                            </li>
                            <li className="flex items-start gap-2">
                                <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                Advanced search
                            </li>
                            <li className="flex items-start gap-2">
                                <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                Access control sharing
                            </li>
                            <li className="flex items-start gap-2">
                                <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                Priority email support
                            </li>
                        </ul>
                        <button className="w-full py-2.5 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-500/30 transition-all transform hover:-translate-y-0.5">
                            Upgrade Plan
                        </button>
                    </div>

                    {/* Pro Plan */}
                    <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col hover:shadow-lg transition-all">
                        <div className="mb-4">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Pro</h3>
                            <p className="text-sm text-slate-500">Power users</p>
                        </div>
                        <div className="mb-6">
                            <p className="text-3xl font-bold text-slate-900 dark:text-white">₹100<span className="text-sm font-normal text-slate-500">/mo</span></p>
                            <p className="text-sm font-semibold text-purple-600 mt-2">Up to 10 GB Storage</p>
                        </div>
                        <ul className="space-y-3 mb-8 flex-1 text-sm text-slate-600 dark:text-slate-300">
                            <li className="flex items-start gap-2">
                                <svg className="w-5 h-5 text-purple-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                Everything in Advance, plus:
                            </li>
                            <li className="flex items-start gap-2">
                                <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                AI Document Summary
                            </li>
                            <li className="flex items-start gap-2">
                                <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                Unlimited sharing
                            </li>
                            <li className="flex items-start gap-2">
                                <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                Dedicated support
                            </li>
                        </ul>
                        <button className="w-full py-2.5 rounded-lg bg-slate-900 dark:bg-slate-700 text-white font-bold hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors">
                            Upgrade Plan
                        </button>
                    </div>
                </div>
            </div>
        ),
        security: (
            <div className="space-y-6">
                <p>Security is at the core of SafeLynx.</p>
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Encryption</h3>
                    <p>We use industry-standard encryption to protect your data at rest and in transit.</p>
                    <h3 className="text-lg font-semibold">Privacy</h3>
                    <p>We do not sell your data. Your documents are yours alone.</p>
                    <h3 className="text-lg font-semibold">Infrastructure</h3>
                    <p>Hosted on secure cloud infrastructure with 24/7 monitoring.</p>
                </div>
            </div>
        ),
        privacy: (
            <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300">
                <p className="font-semibold">Last Updated: December 2025</p>
                <p>At SafeLynx, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information.</p>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-4">1. Information Collection</h3>
                <p>We collect information you provide directly to us, such as when you create an account, upload documents, or contact support.</p>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-4">2. Use of Information</h3>
                <p>We use your information to provide, maintain, and improve our services, and to communicate with you.</p>
            </div>
        ),
        terms: (
            <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300">
                <p className="font-semibold">Last Updated: December 2025</p>
                <p>By using SafeLynx, you agree to these Terms of Service.</p>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-4">1. Acceptance of Terms</h3>
                <p>Accessing our services constitutes your acceptance of these terms.</p>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-4">2. User Responsibilities</h3>
                <p>You are responsible for safeguarding your account credentials and for all activities that occur under your account.</p>
            </div>
        ),
        cookies: (
            <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300">
                <p>We use cookies to enhance your browsing experience and analyze our traffic.</p>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-4">What are cookies?</h3>
                <p>Cookies are small text files stored on your device when you visit a website.</p>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-4">How we use them</h3>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Authentication and security</li>
                    <li>Preferences and settings</li>
                    <li>Analytics and performance</li>
                </ul>
            </div>
        ),
    };

    return (
        <div className="min-h-screen pt-24 pb-12 bg-slate-50 dark:bg-[#111113] transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white dark:bg-[#1A1A1D] rounded-2xl shadow-xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800"
                >
                    <div className="mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
                        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                            {title}
                        </h1>
                        <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></div>
                    </div>

                    <div className="prose prose-slate dark:prose-invert max-w-none">
                        {contentMap[contentKey] || <p>Content coming soon.</p>}
                    </div>

                    <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                        <Link to="/" className="btn btn-outline">
                            Back to Home
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default StaticPage;
