import { capitalCase } from 'change-case';
import { useState } from 'react';
// @mui
import { Container, Tab, Box, Tabs } from '@mui/material';
// components
import { Page, Iconify, HeaderBreadcrumbs } from '../components';
import { EditUser } from 'src/sections/user/EditUser';
import useAuth from 'src/hooks/useAuth';
import { UserAccount } from 'src/sections/user/UserAccount';
// ----------------------------------------------------------------------

export default function UserSettings() {

  const [currentTab, setCurrentTab] = useState('profile'); 
  const { currentUser } = useAuth();

  const ACCOUNT_TABS = [
    {
      value: 'profile',
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: <EditUser />,
    },
    {
      value: 'account',
      icon: <Iconify icon={'ic:baseline-settings-applications'} width={20} height={20} />,
      component: <UserAccount />,
    },
  ];

  return (
    <Page title="User: Account Settings">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading="Settings"
          links={[
            { name: 'User', href: `/user/${currentUser?.address}` },
            { name: 'Settings' },
          ]}
        />

        <Tabs
          value={currentTab}
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
          onChange={(e, value) => setCurrentTab(value)}
        >
          {ACCOUNT_TABS.map((tab) => (
            <Tab
              disableRipple
              key={tab.value}
              label={capitalCase(tab.value)}
              icon={tab.icon}
              value={tab.value}
            />
          ))}
        </Tabs>

        <Box sx={{ mb: 5 }} />

        {ACCOUNT_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
