import { motion } from 'framer-motion';
import TeamCard from '../components/TeamCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Team = () => {
  const teamMembers = [
    {
      name: 'Abhishek Goyal',
      role: 'Backend Lead',
      image: '/abhi.jpeg',
      bio: 'Architecting robust server infrastructure and API development. Passionate about scalable systems and clean code.',
      social: {
        github: 'https://github.com/Abhigoyal213',
        linkedin: 'https://www.linkedin.com/in/abhishekgoyal213/',
        email: 'abhishekgoyal29250@gmail.com',
      },
    },
    {
      name: 'Kanishk Mangal',
      role: 'UI/UX & Frontend Designer',
      image: '/kan.jpeg',
      bio: 'Creating beautiful, intuitive interfaces that users love. Focused on modern design principles and exceptional user experiences.',
      social: {
        github: 'https://github.com/kanishkmangal',
        linkedin: 'https://linkedin.com/in/kanishk-mangal',
        email: 'kanishkmangal2@gmail.com',
      },
    },
    {
      name: 'Nikhil Rathore',
      role: 'Database & Security Engineer',
      bio: 'Ensuring data integrity and implementing security best practices. Expert in database optimization and cybersecurity.',
      social: {
        github: 'https://github.com/nikhilrathore',
        linkedin: 'https://linkedin.com/in/641-nikhil',
        email: 'nikhil@safelynx.com',
      },
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20 dark:from-slate-900 dark:via-indigo-900/20 dark:to-purple-900/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Our Team
              </span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Meet the talented individuals behind SafeLynx, dedicated to building the future of secure document management.
            </p>
          </motion.div>

          {/* Team Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <TeamCard key={member.name} member={member} index={index} />
            ))}
          </div>

          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20 text-center"
          >
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-200 dark:border-slate-700 max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Our Mission</h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                At SafeLynx, we believe that your personal documents deserve the highest level of security and convenience.
                Our team is committed to providing a platform that combines cutting-edge technology with intuitive design,
                ensuring that your sensitive information remains protected while being easily accessible when you need it.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Team;

