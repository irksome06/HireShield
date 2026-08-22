import React, { createContext, useContext, useState, useEffect } from 'react';

const PreferencesContext = createContext(null);

const TRANSLATIONS = {
  'en-US': {
    // Nav & Sidebar
    'nav.home': 'Home / Station',
    'nav.scanner': 'Check a Job Offer',
    'nav.companies': 'Verified Companies',
    'nav.insights': 'Safety Insights',
    'nav.history': 'History',
    'nav.watchlist': 'Watchlist',
    'nav.profile': 'My Profile',
    'nav.settings': 'Settings',
    'nav.signout': 'Sign Out',
    
    // Settings Page
    'settings.badge': 'Platform Security & Preferences',
    'settings.title': 'Settings & Security Console',
    'settings.desc': 'Manage account passwords, alert notifications, appearance themes, and support channels.',
    
    // Change Password
    'pass.title': 'Change Account Password',
    'pass.desc': 'Update your account password with real-time bcrypt encryption and salt verification.',
    'pass.current': 'Current Password',
    'pass.new': 'New Password',
    'pass.confirm': 'Confirm New Password',
    'pass.updateBtn': 'Update Password',
    'pass.success': 'Account password successfully updated in real database!',
    
    // Notifications
    'notif.title': 'Notifications & Alerts',
    'notif.desc': 'Configure how and when HireShield sends you risk telemetry and offer verification updates.',
    'notif.email': 'Email Notifications',
    'notif.emailDesc': 'Receive weekly safety digests and verification summaries.',
    'notif.security': 'Security Alerts',
    'notif.securityDesc': 'Immediate alerts when a scanned offer triggers Critical risk.',
    'notif.jobAlerts': 'Job Alerts',
    'notif.jobAlertsDesc': 'Notifications when verified employers post high-trust positions.',
    'notif.push': 'Push Notifications',
    'notif.pushDesc': 'Direct browser desktop notifications for real-time scans.',
    
    // Appearance
    'app.title': 'Appearance & Language',
    'app.desc': 'Customize interface theme preference and display language.',
    'app.themeMode': 'Theme Mode',
    'app.dark': 'Dark Futuristic',
    'app.light': 'Light Professional',
    'app.lang': 'Display Language',
    
    // Help & Support
    'help.title': 'Help & Support',
    'help.desc': 'Access knowledge documentation, report suspicious recruitment vectors, or reach support.',
    'help.center': 'Help Center',
    'help.centerDesc': 'Guides on job scams and DNS verification.',
    'help.report': 'Report a Problem',
    'help.reportDesc': 'Submit fraudulent offer samples to our threat lab.',
    'help.contact': 'Contact Support',
    'help.contactDesc': 'Direct inquiries with our security analysts.',
    'help.about': 'About HireShield',
    'help.aboutDesc': 'Version 2.0 • Deterministic Engine details.'
  },

  'hi-IN': {
    // Nav & Sidebar
    'nav.home': 'होम / स्टेशन',
    'nav.scanner': 'जॉब ऑफर की जाँच करें',
    'nav.companies': 'सत्यापित कंपनियाँ',
    'nav.insights': 'सुरक्षा अंतर्दृष्टि',
    'nav.history': 'ऑडिट इतिहास',
    'nav.watchlist': 'वॉचलिस्ट',
    'nav.profile': 'मेरी प्रोफाइल',
    'nav.settings': 'सेटिंग्स',
    'nav.signout': 'साइन आउट',
    
    // Settings Page
    'settings.badge': 'प्लेटफ़ॉर्म सुरक्षा और प्राथमिकताएं',
    'settings.title': 'सेटिंग्स और सुरक्षा कंसोल',
    'settings.desc': 'अकाउंट पासवर्ड, अलर्ट नोटिफिकेशन, थीम और सहायता चैनलों को प्रबंधित करें।',
    
    // Change Password
    'pass.title': 'अकाउंट पासवर्ड बदलें',
    'pass.desc': 'रीयल-टाइम bcrypt एन्क्रिप्शन के साथ अपना अकाउंट पासवर्ड अपडेट करें।',
    'pass.current': 'वर्तमान पासवर्ड',
    'pass.new': 'नया पासवर्ड',
    'pass.confirm': 'नए पासवर्ड की पुष्टि करें',
    'pass.updateBtn': 'पासवर्ड अपडेट करें',
    'pass.success': 'अकाउंट पासवर्ड डेटाबेस में सफलतापूर्वक अपडेट हो गया!',
    
    // Notifications
    'notif.title': 'सूचनाएं और अलर्ट',
    'notif.desc': 'तय करें कि हायरशील्ड आपको जोखिम अलर्ट और वेरिफिकेशन कब भेजे।',
    'notif.email': 'ईमेल सूचनाएं',
    'notif.emailDesc': 'साप्ताहिक सुरक्षा सारांश और सत्यापन रिपोर्ट प्राप्त करें।',
    'notif.security': 'सुरक्षा अलर्ट',
    'notif.securityDesc': 'क्रिटिकल रिस्क वाला ऑफर स्कैन होने पर तुरंत अलर्ट।',
    'notif.jobAlerts': 'जॉब अलर्ट',
    'notif.jobAlertsDesc': 'सत्यापित नियोक्ताओं द्वारा जॉब पोस्ट करने पर अलर्ट।',
    'notif.push': 'पुश नोटिफिकेशन',
    'notif.pushDesc': 'रीयल-टाइम स्कैन के लिए डेस्कटॉप ब्राउज़र नोटिफिकेशन।',
    
    // Appearance
    'app.title': 'दिखावट और भाषा (Appearance)',
    'app.desc': 'इंटरफ़ेस थीम और प्रदर्शन भाषा चुनें।',
    'app.themeMode': 'थीम मोड',
    'app.dark': 'डार्क फ्यूचरिस्टिक',
    'app.light': 'लाइट प्रोफेशनल',
    'app.lang': 'प्रदर्शन भाषा',
    
    // Help & Support
    'help.title': 'सहायता और समर्थन',
    'help.desc': 'दस्तावेज़ पढ़ें, संदेहास्पद जॉब रिपोर्ट करें या सहायता टीम से संपर्क करें।',
    'help.center': 'सहायता केंद्र',
    'help.centerDesc': 'जॉब स्कैम और DNS सत्यापन पर विस्तृत गाइड।',
    'help.report': 'समस्या रिपोर्ट करें',
    'help.reportDesc': 'धोखाधड़ी वाले ऑफर सैंपल हमारी थ्रेट लैब को भेजें।',
    'help.contact': 'सपोर्ट से संपर्क करें',
    'help.contactDesc': 'हमारे सुरक्षा विश्लेषकों से सीधी पूछताछ।',
    'help.about': 'हायरशील्ड के बारे में',
    'help.aboutDesc': 'संस्करण 2.0 • डिटर्मिनिस्टिक इंजन विवरण।'
  },

  'es-ES': {
    // Nav & Sidebar
    'nav.home': 'Inicio / Estación',
    'nav.scanner': 'Verificar Oferta de Empleo',
    'nav.companies': 'Empresas Verificadas',
    'nav.insights': 'Informes de Seguridad',
    'nav.history': 'Historial de Auditoría',
    'nav.watchlist': 'Guardados',
    'nav.profile': 'Mi Perfil',
    'nav.settings': 'Configuración',
    'nav.signout': 'Cerrar Sesión',
    
    // Settings Page
    'settings.badge': 'Seguridad y Preferencias de la Plataforma',
    'settings.title': 'Panel de Configuración y Seguridad',
    'settings.desc': 'Gestione contraseñas, notificaciones de alerta, apariencia e idioma.',
    
    // Change Password
    'pass.title': 'Cambiar Contraseña de la Cuenta',
    'pass.desc': 'Actualice su contraseña con cifrado bcrypt en tiempo real.',
    'pass.current': 'Contraseña Actual',
    'pass.new': 'Nueva Contraseña',
    'pass.confirm': 'Confirmar Nueva Contraseña',
    'pass.updateBtn': 'Actualizar Contraseña',
    'pass.success': '¡Contraseña actualizada con éxito en la base de datos!',
    
    // Notifications
    'notif.title': 'Notificaciones y Alertas',
    'notif.desc': 'Configure cómo HireShield le envía telemetría de riesgos.',
    'notif.email': 'Notificaciones por Correo',
    'notif.emailDesc': 'Reciba resúmenes de seguridad semanales.',
    'notif.security': 'Alertas de Seguridad',
    'notif.securityDesc': 'Alertas inmediatas cuando una oferta es Crítica.',
    'notif.jobAlerts': 'Alertas de Empleo',
    'notif.jobAlertsDesc': 'Avisos cuando empresas verificadas publican empleos.',
    'notif.push': 'Notificaciones Push',
    'notif.pushDesc': 'Notificaciones en el navegador para escaneos en vivo.',
    
    // Appearance
    'app.title': 'Apariencia e Idioma',
    'app.desc': 'Personalice el tema de la interfaz y el idioma.',
    'app.themeMode': 'Modo de Tema',
    'app.dark': 'Oscuro Futurista',
    'app.light': 'Claro Profesional',
    'app.lang': 'Idioma del Sistema',
    
    // Help & Support
    'help.title': 'Ayuda y Soporte',
    'help.desc': 'Acceda a la documentación, reporte ofertas sospechosas o contacte a soporte.',
    'help.center': 'Centro de Ayuda',
    'help.centerDesc': 'Guías sobre fraudes laborales y verificación DNS.',
    'help.report': 'Reportar un Problema',
    'help.reportDesc': 'Envíe muestras fraudulentas a nuestro laboratorio.',
    'help.contact': 'Contactar a Soporte',
    'help.contactDesc': 'Consultas directas con analistas de ciberseguridad.',
    'help.about': 'Acerca de HireShield',
    'help.aboutDesc': 'Versión 2.0 • Motor Determinista.'
  },

  'de-DE': {
    // Nav & Sidebar
    'nav.home': 'Startseite / Station',
    'nav.scanner': 'Stellenangebot prüfen',
    'nav.companies': 'Verifizierte Unternehmen',
    'nav.insights': 'Sicherheits-Einblicke',
    'nav.history': 'Audit-Verlauf',
    'nav.watchlist': 'Merkliste',
    'nav.profile': 'Mein Profil',
    'nav.settings': 'Einstellungen',
    'nav.signout': 'Abmelden',
    
    // Settings Page
    'settings.badge': 'Plattformsicherheit & Einstellungen',
    'settings.title': 'Sicherheits- & Einstellungskonsole',
    'settings.desc': 'Verwalten Sie Passwörter, Benachrichtigungen, Theme und Support.',
    
    // Change Password
    'pass.title': 'Passwort ändern',
    'pass.desc': 'Aktualisieren Sie Ihr Passwort mit sicherer bcrypt-Verschlüsselung.',
    'pass.current': 'Aktuelles Passwort',
    'pass.new': 'Neues Passwort',
    'pass.confirm': 'Neues Passwort bestätigen',
    'pass.updateBtn': 'Passwort aktualisieren',
    'pass.success': 'Passwort erfolgreich in der Datenbank aktualisiert!',
    
    // Notifications
    'notif.title': 'Benachrichtigungen & Warnungen',
    'notif.desc': 'Konfigurieren Sie Ihre Sicherheits- und Risikowarnungen.',
    'notif.email': 'E-Mail-Benachrichtigungen',
    'notif.emailDesc': 'Wöchentliche Sicherheitsübersichten erhalten.',
    'notif.security': 'Sicherheitswarnungen',
    'notif.securityDesc': 'Sofortige Warnung bei kritischem Betrugsrisiko.',
    'notif.jobAlerts': 'Job-Benachrichtigungen',
    'notif.jobAlertsDesc': 'Mitteilungen bei verifizierten Stellenangeboten.',
    'notif.push': 'Push-Benachrichtigungen',
    'notif.pushDesc': 'Desktop-Benachrichtigungen für Live-Scans.',
    
    // Appearance
    'app.title': 'Erscheinungsbild & Sprache',
    'app.desc': 'Benutzeroberflächen-Theme und Sprache anpassen.',
    'app.themeMode': 'Theme-Modus',
    'app.dark': 'Dunkel (Futuristisch)',
    'app.light': 'Hell (Professionell)',
    'app.lang': 'Sprache',
    
    // Help & Support
    'help.title': 'Hilfe & Support',
    'help.desc': 'Dokumentation lesen, verdächtige Angebote melden oder Support kontaktieren.',
    'help.center': 'Hilfezentrum',
    'help.centerDesc': 'Leitfäden zu Jobbetrug und DNS-Verifizierung.',
    'help.report': 'Problem melden',
    'help.reportDesc': 'Betrügerische Angebote an unser Labor senden.',
    'help.contact': 'Support kontaktieren',
    'help.contactDesc': 'Direkter Kontakt zu unseren Sicherheitsanalysten.',
    'help.about': 'Über HireShield',
    'help.aboutDesc': 'Version 2.0 • Deterministische Engine.'
  },

  'fr-FR': {
    // Nav & Sidebar
    'nav.home': 'Accueil / Station',
    'nav.scanner': 'Vérifier une Offre',
    'nav.companies': 'Entreprises Vérifiées',
    'nav.insights': 'Aperçus de Sécurité',
    'nav.history': 'Historique d\'Audit',
    'nav.watchlist': 'Favoris',
    'nav.profile': 'Mon Profil',
    'nav.settings': 'Paramètres',
    'nav.signout': 'Déconnexion',
    
    // Settings Page
    'settings.badge': 'Sécurité & Préférences de la Plateforme',
    'settings.title': 'Console de Paramètres et Sécurité',
    'settings.desc': 'Gérez les mots de passe, les alertes, le thème et l\'assistance.',
    
    // Change Password
    'pass.title': 'Changer le Mot de Passe',
    'pass.desc': 'Mettez à jour votre mot de passe avec le chiffrement bcrypt.',
    'pass.current': 'Mot de passe actuel',
    'pass.new': 'Nouveau mot de passe',
    'pass.confirm': 'Confirmer le nouveau mot de passe',
    'pass.updateBtn': 'Mettre à jour',
    'pass.success': 'Mot de passe mis à jour avec succès dans la base de données !',
    
    // Notifications
    'notif.title': 'Notifications & Alertes',
    'notif.desc': 'Configurez la façon dont HireShield vous informe des risques.',
    'notif.email': 'Notifications par Email',
    'notif.emailDesc': 'Recevez des résumés hebdomadaires de sécurité.',
    'notif.security': 'Alertes de Sécurité',
    'notif.securityDesc': 'Alertes immédiates en cas d\'offre à risque critique.',
    'notif.jobAlerts': 'Alertes d\'Emploi',
    'notif.jobAlertsDesc': 'Notifications lorsque des recruteurs vérifiés publient.',
    'notif.push': 'Notifications Push',
    'notif.pushDesc': 'Notifications directes sur le navigateur.',
    
    // Appearance
    'app.title': 'Apparence & Langue',
    'app.desc': 'Personnalisez le thème de l\'interface et la langue.',
    'app.themeMode': 'Mode de Thème',
    'app.dark': 'Sombre Futuriste',
    'app.light': 'Clair Professionnel',
    'app.lang': 'Langue d\'Affichage',
    
    // Help & Support
    'help.title': 'Aide & Support',
    'help.desc': 'Accédez à la documentation, signalez des arnaques ou contactez l\'assistance.',
    'help.center': 'Centre d\'Aide',
    'help.centerDesc': 'Guides sur les arnaques à l\'emploi et la vérification DNS.',
    'help.report': 'Signaler un Problème',
    'help.reportDesc': 'Soumettez des échantillons frauduleux à notre lab.',
    'help.contact': 'Contacter le Support',
    'help.contactDesc': 'Échangez directement avec nos analystes.',
    'help.about': 'À propos de HireShield',
    'help.aboutDesc': 'Version 2.0 • Moteur Déterministe.'
  },

  'en-GB': {
    // Identical to en-US with UK spelling
    'nav.home': 'Home / Station',
    'nav.scanner': 'Check a Job Offer',
    'nav.companies': 'Verified Companies',
    'nav.insights': 'Safety Insights',
    'nav.history': 'History',
    'nav.watchlist': 'Watchlist',
    'nav.profile': 'My Profile',
    'nav.settings': 'Settings',
    'nav.signout': 'Sign Out',
    
    'settings.badge': 'Platform Security & Preferences',
    'settings.title': 'Settings & Security Console',
    'settings.desc': 'Manage account passwords, alert notifications, appearance themes, and support channels.',
    
    'pass.title': 'Change Account Password',
    'pass.desc': 'Update your account password with real-time bcrypt encryption and salt verification.',
    'pass.current': 'Current Password',
    'pass.new': 'New Password',
    'pass.confirm': 'Confirm New Password',
    'pass.updateBtn': 'Update Password',
    'pass.success': 'Account password successfully updated in real database!',
    
    'notif.title': 'Notifications & Alerts',
    'notif.desc': 'Configure how and when HireShield sends you risk telemetry and offer verification updates.',
    'notif.email': 'Email Notifications',
    'notif.emailDesc': 'Receive weekly safety digests and verification summaries.',
    'notif.security': 'Security Alerts',
    'notif.securityDesc': 'Immediate alerts when a scanned offer triggers Critical risk.',
    'notif.jobAlerts': 'Job Alerts',
    'notif.jobAlertsDesc': 'Notifications when verified employers post high-trust positions.',
    'notif.push': 'Push Notifications',
    'notif.pushDesc': 'Direct browser desktop notifications for real-time scans.',
    
    'app.title': 'Appearance & Language',
    'app.desc': 'Customise interface theme preference and display language.',
    'app.themeMode': 'Theme Mode',
    'app.dark': 'Dark Futuristic',
    'app.light': 'Light Professional',
    'app.lang': 'Display Language',
    
    'help.title': 'Help & Support',
    'help.desc': 'Access knowledge documentation, report suspicious recruitment vectors, or reach support.',
    'help.center': 'Help Centre',
    'help.centerDesc': 'Guides on job scams and DNS verification.',
    'help.report': 'Report a Problem',
    'help.reportDesc': 'Submit fraudulent offer samples to our threat lab.',
    'help.contact': 'Contact Support',
    'help.contactDesc': 'Direct enquiries with our security analysts.',
    'help.about': 'About HireShield',
    'help.aboutDesc': 'Version 2.0 • Deterministic Engine details.'
  }
};

export const PreferencesProvider = ({ children }) => {
  // Theme state
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem('hireshield_theme') || 'dark';
  });

  // Language state
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('hireshield_language') || 'en-US';
  });

  // Notifications state
  const [notifications, setNotificationsState] = useState(() => {
    try {
      const saved = localStorage.getItem('hireshield_notifications');
      return saved ? JSON.parse(saved) : { email: true, security: true, jobAlerts: true, push: false };
    } catch {
      return { email: true, security: true, jobAlerts: true, push: false };
    }
  });

  // Apply theme to HTML root & body
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('theme-light');
      root.classList.remove('theme-dark');
      document.body.classList.add('theme-light');
    } else {
      root.classList.add('theme-dark');
      root.classList.remove('theme-light');
      document.body.classList.remove('theme-light');
    }
    localStorage.setItem('hireshield_theme', theme);
  }, [theme]);

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
  };

  const setLanguage = (newLang) => {
    setLanguageState(newLang);
    localStorage.setItem('hireshield_language', newLang);
  };

  const toggleNotification = (key) => {
    setNotificationsState(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      localStorage.setItem('hireshield_notifications', JSON.stringify(updated));
      return updated;
    });
  };

  // Translation helper
  const t = (key, fallback = '') => {
    const dict = TRANSLATIONS[language] || TRANSLATIONS['en-US'];
    return dict[key] || TRANSLATIONS['en-US'][key] || fallback || key;
  };

  return (
    <PreferencesContext.Provider value={{
      theme,
      setTheme,
      language,
      setLanguage,
      notifications,
      toggleNotification,
      t
    }}>
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
};
