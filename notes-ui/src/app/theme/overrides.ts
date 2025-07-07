const components = {
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundColor: "#FFFDF7",
        boxShadow: "0 2px 12px rgba(60,60,67,0.08)",
        borderRadius: 18,
        border: "1px solid #F5E7B2",
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 14,
        boxShadow: "0 2px 8px rgba(60,60,67,0.08)",
        fontWeight: 600,
        padding: "10px 24px",
      },
      containedPrimary: {
        backgroundColor: "#FFD600",
        color: "#222222",
        "&:hover": {
          backgroundColor: "#FFEA00",
        },
        boxShadow: "0 2px 8px rgba(60,60,67,0.08)",
      },
    },
  },
  MuiInputBase: {
    styleOverrides: {
      root: {
        backgroundColor: "#FFFDF7",
        borderRadius: 12,
        padding: "12px 18px",
        boxShadow: "0 1px 3px rgba(60,60,67,0.04)",
        border: "1px solid #F5E7B2",
      },
      input: {
        fontSize: "1.08rem",
        color: "#222222",
      },
    },
  },
  MuiDivider: {
    styleOverrides: {
      root: {
        backgroundColor: "#F5E7B2",
        opacity: 0.7,
      },
    },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: {
        borderRadius: 10,
        margin: "2px 0",
        transition: "background 0.2s, box-shadow 0.2s",
        '&.Mui-selected': {
          backgroundColor: '#FFF9E3',
          boxShadow: '0 2px 8px rgba(255,214,0,0.08)',
        },
        '&:hover': {
          backgroundColor: '#FFFBEA',
        },
      },
    },
  },
  MuiListItem: {
    styleOverrides: {
      root: {
        borderRadius: 10,
        margin: "2px 0",
      },
    },
  },
};

export default components;
