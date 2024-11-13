import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, BottomNavigation, BottomNavigationAction, TextField, Box, Button, Container, Card, CardContent, CardActions, CardHeader, Checkbox, Collapse, List, ListItem, ListItemText, Paper, Divider } from '@mui/material';
import { Home, Bookmark, Notifications, ExpandMore, ExpandLess, AccountCircle } from '@mui/icons-material';

const App = () => {
  const [navValue, setNavValue] = useState('home');
  const [expanded, setExpanded] = useState({});
  const [savedOrgs, setSavedOrgs] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // New state for search query

  const handleExpandClick = (orgId) => {
    setExpanded((prev) => ({ ...prev, [orgId]: !prev[orgId] }));
  };

  const handleSave = (orgId) => {
    setSavedOrgs((prev) => prev.includes(orgId) ? prev : [...prev, orgId]);
  };

  const handleUnsave = (orgId) => {
    setSavedOrgs((prev) => prev.filter(id => id !== orgId));
  };

  const organizations = [
    { id: 1, name: "Community Food Pantry", location: "City Center", description: "Providing food for those in need.", website: "https://example.com", needs: ["Bread", "Canned Soup", "Boxed Pasta", "Fresh Vegetables"], loanable: false },
    { id: 2, name: "Youth Theater Company", location: "Downtown", description: "Supporting young artists.", website: "https://example.com", needs: ["Costumes", "Props"], loanable: true },
  ];

  // Filtered organizations based on search query
  const filteredOrganizations = organizations.filter(org => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      org.name.toLowerCase().includes(searchTerm) ||
      org.location.toLowerCase().includes(searchTerm) ||
      org.needs.some(need => need.toLowerCase().includes(searchTerm))
    );
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Top App Bar */}
      <AppBar position="sticky" sx={{ width: '100%' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>OpenHands</Typography>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Content Section with Independent Scrolling */}
      <Box sx={{ flex: 1, overflowY: 'auto', padding: 2 }}>
        <Box display="flex" alignItems="center" my={2}>
          <TextField
            label="Search organizations..."
            variant="outlined"
            fullWidth
            sx={{ marginRight: 1 }}
            value={searchQuery} // Set the value of the TextField
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query on change
          />
          <Button variant="contained">Recommend</Button>
        </Box>

        {navValue === 'home' && (
          filteredOrganizations.map((org) => (
            <Card key={org.id} sx={{ marginBottom: 2 }}>
              <CardHeader
                title={org.name}
                subheader={org.location}
                action={
                  savedOrgs.includes(org.id) ? (
                    <Button color="secondary" onClick={() => handleUnsave(org.id)}>Unsave</Button>
                  ) : (
                    <Button color="primary" onClick={() => handleSave(org.id)}>Save</Button>
                  )
                }
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">{org.description}</Typography>
                <Button size="small" href={org.website} target="_blank">Visit Website</Button>
              </CardContent>
              <CardActions>
                <Button onClick={() => handleExpandClick(org.id)}>
                  {expanded[org.id] ? "Hide Needs" : "Show Needs"}
                  {expanded[org.id] ? <ExpandLess /> : <ExpandMore />}
                </Button>
                {org.loanable && <Button variant="outlined">Loan</Button>}
                <Button variant="contained">Donate</Button>
              </CardActions>
              <Collapse in={expanded[org.id]} timeout="auto" unmountOnExit>
                <List>
                  {org.needs.map((need, index) => (
                    <ListItem key={index}>
                      <Checkbox />
                      <ListItemText primary={need} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </Card>
          ))
        )}

        {navValue === 'saved' && (
          savedOrgs.length ? (
            organizations.filter((org) => savedOrgs.includes(org.id)).map((org) => (
              <Card key={org.id} sx={{ marginBottom: 2 }}>
                <CardHeader title={org.name} subheader={org.location} />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">{org.description}</Typography>
                  <Button size="small" href={org.website} target="_blank">Visit Website</Button>
                </CardContent>
                <CardActions>
                  <Button color="secondary" onClick={() => handleUnsave(org.id)}>Unsave</Button>
                  <Button variant="contained">Donate</Button>
                </CardActions>
              </Card>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary" align="center">No saved organizations.</Typography>
          )
        )}

        {navValue === 'alerts' && (
          <Paper elevation={2} sx={{ padding: 2, marginTop: 2 }}>
            <Typography variant="h6" align="center">Alerts</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body2" color="text.secondary" align="center">No alerts at this time.</Typography>
          </Paper>
        )}
      </Box>

      {/* Bottom Navigation */}
      <BottomNavigation
        value={navValue}
        onChange={(event, newValue) => setNavValue(newValue)}
        showLabels
        sx={{ width: '100%', position: 'sticky', bottom: 0 }}
      >
        <BottomNavigationAction label="Home" value="home" icon={<Home />} />
        <BottomNavigationAction label="Saved" value="saved" icon={<Bookmark />} />
        <BottomNavigationAction label="Alerts" value="alerts" icon={<Notifications />} />
      </BottomNavigation>
    </Box>
  );
};

export default App;





