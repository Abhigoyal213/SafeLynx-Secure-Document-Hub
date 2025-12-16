import { motion } from 'framer-motion';

const PasswordStrengthIndicator = ({ validation, showMatch = true }) => {
    const rules = [
        { key: 'minLength', label: 'At least 8 characters', valid: validation.minLength },
        { key: 'hasUppercase', label: 'One uppercase letter', valid: validation.hasUppercase },
        { key: 'hasLowercase', label: 'One lowercase letter', valid: validation.hasLowercase },
        { key: 'hasNumber', label: 'One number', valid: validation.hasNumber },
        { key: 'hasSpecialChar', label: 'One special character', valid: validation.hasSpecialChar },
    ];

    if (showMatch) {
        rules.push({ key: 'passwordsMatch', label: 'Passwords match', valid: validation.passwordsMatch });
    }

    return (
        <div className="space-y-2 mt-3">
            <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Password Requirements:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {rules.map((rule) => (
                    <motion.div
                        key={rule.key}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-2"
                    >
                        <div
                            className={`flex-shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${rule.valid
                                    ? 'bg-emerald-500 border-emerald-500'
                                    : 'bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600'
                                }`}
                        >
                            {rule.valid && (
                                <svg
                                    className="w-3 h-3 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={3}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            )}
                        </div>
                        <span
                            className={`text-xs transition-colors duration-200 ${rule.valid
                                    ? 'text-emerald-600 dark:text-emerald-400 font-medium'
                                    : 'text-gray-500 dark:text-gray-400'
                                }`}
                        >
                            {rule.label}
                        </span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default PasswordStrengthIndicator;
