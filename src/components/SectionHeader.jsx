import { Box, Typography } from '@mui/material'
import { motion } from 'framer-motion'

function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  actions = null,
}) {
  const isCentered = align === 'center'

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      sx={{
        mb: { xs: 6, sm: 7 },
        display: 'flex',
        flexDirection: 'column',
        gap: 1.8,
        alignItems: isCentered ? 'center' : 'flex-start',
        textAlign: isCentered ? 'center' : 'left',
      }}
    >
      {eyebrow ? (
        <Typography
          sx={{
            color: '#0a66c2',
            fontWeight: 700,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            fontSize: '0.7rem',
          }}
        >
          {eyebrow}
        </Typography>
      ) : null}

      <Box sx={{ maxWidth: '48rem' }}>
        <Typography
          component="h2"
          sx={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: { xs: '1.9rem', sm: '2.45rem' },
            fontWeight: 700,
            letterSpacing: '-0.01em',
            lineHeight: 1.1,
            color: '#111827',
          }}
        >
          {title}
        </Typography>

        <Box
          sx={{
            mt: 2,
            mx: isCentered ? 'auto' : 0,
            height: 3,
            width: 62,
            borderRadius: 999,
            bgcolor: '#0a66c2',
          }}
        />

        <Typography
          sx={{
            mt: 1.8,
            maxWidth: '40rem',
            mx: isCentered ? 'auto' : 0,
            fontSize: { xs: '0.98rem', sm: '1.04rem' },
            color: '#4b5563',
          }}
        >
          {description}
        </Typography>
      </Box>

      {actions ? (
        <Box sx={{ mt: 0.5, width: '100%', display: 'flex', justifyContent: isCentered ? 'center' : 'flex-start' }}>
          {actions}
        </Box>
      ) : null}
    </Box>
  )
}

export default SectionHeader
