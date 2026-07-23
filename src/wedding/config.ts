export const ASSET_VERSION = '2026-07-23-01';

const withVersion = (path: string) => `${path}?v=${ASSET_VERSION}`;

export const WEDDING_CONFIG = {
  couple: {
    groom: { name: { en: 'Dinesh Kumar', ta: 'தினேஷ் குமார்' }, initial: 'D' },
    bride: { name: { en: 'Charumithaa', ta: 'சாருமிதா' }, initial: 'C' },
  },
  monogram: { en: 'D·C', ta: 'தி·சா' },
  venue: {
    name: { en: 'M.P. Wedding & Convention Hall', ta: 'எம்.பி. வெட்டிங் & கன்வென்ஷன் ஹால்' },
    address: {
      en: 'No. 8, Sembium Redhills Main Road, Kathirvedu, Puzhal, Chennai – 600066',
      ta: 'எண். 8, செம்பியம் ரெட்ஹில்ஸ் மெயின் ரோடு, கதிர்வேடு, புழல், சென்னை – 600066',
    },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=M.P.%20Wedding%20%26%20Convention%20Hall%2C%20No.8%2C%20Sembium%20Redhills%20Main%20Road%2C%20Kathirvedu%2C%20Puzhal%2C%20Chennai%20-%20600066',
  },
  events: {
    reception: {
      date: '2026-08-22',
      day: { en: 'Saturday', ta: 'சனிக்கிழமை' },
      dateLabel: { en: 'Saturday, 22 August 2026', ta: 'சனிக்கிழமை, 22 ஆகஸ்ட் 2026' },
      time: { en: '6:30 PM onwards', ta: 'மாலை 6:30 மணி முதல்' },
      start: '20260822T183000',
      end: '20260822T220000',
    },
    wedding: {
      date: '2026-08-23',
      day: { en: 'Sunday', ta: 'ஞாயிற்றுக்கிழமை' },
      dateLabel: { en: 'Sunday, 23 August 2026', ta: 'ஞாயிற்றுக்கிழமை, 23 ஆகஸ்ட் 2026' },
      time: { en: '9:00 AM – 10:00 AM', ta: 'காலை 9:00 மணி முதல் 10:00 மணி வரை' },
      start: '20260823T090000',
      end: '20260823T100000',
    },
  },
  calendar: {
    title: { en: 'Dinesh & Charumithaa Wedding', ta: 'தினேஷ் & சாருமிதா திருமணம்' },
    description: { en: 'We invite you to join us in celebrating our wedding.', ta: 'எங்கள் திருமண விழாவில் கலந்துகொள்ள அன்புடன் அழைக்கிறோம்.' },
  },
  countdownTarget: '2026-08-23T09:00:00+05:30',
  assets: {
    couple: {
      // Formal invitation pose; used once in the opening story.
      heroNamaste: withVersion('/assets/wedding/couple/hero-namaste.webp'),
      // Individual editorial portraits for the bride and groom sections.
      brideSolo: '/assets/wedding/couple/bride-solo.webp',
      groomSolo: withVersion('/assets/wedding/couple/groom-solo.webp'),
      // Supporting reception portrait; intentionally framed because it has a rectangular canvas.
      seated: withVersion('/assets/wedding/couple/couple-seated.webp'),
      // Transparent interaction pose for Their Journey and the finale narrative.
      handholding: '/assets/wedding/couple/couple-handholding.webp',
      // Finale-only celebration pose.
      lift: '/assets/wedding/couple/couple-lift.webp',
      // Finale closing pose.
      finalClose: '/assets/wedding/couple/couple-final-close.webp',
      // Alternate formal artwork retained for future use, not duplicated in the current story flow.
      armLinked: '/assets/wedding/couple/couple-arm-linked.webp',
      // Calm framed portrait reserved for Blessings.
      togetherForever: '/assets/wedding/couple/together-forever-portrait.webp',
    },
    scenes: {
      // Cinematic finale approach frames.
      runApart: '/assets/wedding/scenes/couple-run-apart.webp',
      runTogether: '/assets/wedding/scenes/couple-run-together.webp',
    },
    backgrounds: {
      paperTexture: '/assets/wedding/backgrounds/paper-texture.webp',
      goldHalo: '/assets/wedding/backgrounds/gold-halo.webp',
      pinkWatercolour: '/assets/wedding/backgrounds/pink-watercolour.webp',
      fallingPetals: '/assets/wedding/backgrounds/falling-petals.webp',
      floralDivider: '/assets/wedding/backgrounds/floral-divider.webp',
      floralFooter: '/assets/wedding/backgrounds/floral-footer.webp',
      invitationFrame: '/assets/wedding/backgrounds/invitation-frame.webp',
      botanicalStage: '/assets/wedding/backgrounds/botanical-stage.webp',
    },
    icons: {
      invitationEmblem: '/assets/wedding/icons/wedding-icon-01.webp',
      celebration: '/assets/wedding/icons/wedding-icon-02.webp',
      time: '/assets/wedding/icons/wedding-icon-03.webp',
      calendar: '/assets/wedding/icons/wedding-icon-04.webp',
      venue: '/assets/wedding/icons/wedding-icon-05.webp',
      location: '/assets/wedding/icons/wedding-icon-06.webp',
      directions: '/assets/wedding/icons/wedding-icon-07.webp',
      maps: '/assets/wedding/icons/wedding-icon-08.webp',
      countdown: '/assets/wedding/icons/wedding-icon-09.webp',
      petalDivider: '/assets/wedding/icons/wedding-icon-10.webp',
      floralArch: '/assets/wedding/icons/wedding-icon-11.webp',
      rings: '/assets/wedding/icons/wedding-icon-12.webp',
      garland: '/assets/wedding/icons/wedding-icon-13.webp',
      mandap: '/assets/wedding/icons/wedding-icon-14.webp',
      reception: '/assets/wedding/icons/wedding-icon-15.webp',
      memories: '/assets/wedding/icons/wedding-icon-16.webp',
      blessings: '/assets/wedding/icons/wedding-icon-17.webp',
      finalBlessing: '/assets/wedding/icons/wedding-icon-18.webp',
      language: '/assets/wedding/icons/wedding-icon-19.webp',
      contact: '/assets/wedding/icons/wedding-icon-20.webp',
    },
    audio: '/assets/wedding/audio/wedding-theme.mp3',
  },
} as const;

export type EventKey = keyof typeof WEDDING_CONFIG.events;
