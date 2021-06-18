/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  Link,
  List,
  ListSubheader,
  Typography,
  makeStyles
} from '@material-ui/core';
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';
import {
  ShoppingCart as ShoppingCartIcon,
  FileText as FileTextIcon,
  TrendingUp as TrendingUpIcon,
  BarChart as BarChartIcon,
  User as UserIcon,
  PieChart as PieChartIcon,
  Users as UsersIcon
} from 'react-feather';
import Logo from 'src/components/Logo';
import useAuth from 'src/hooks/useAuth';
import NavItem from './NavItem';

const sections = [
  {
    subheader: 'Inversionista',
    role: ['investor'],
    items: [
      {
        title: 'Resumen',
        icon: TrendingUpIcon,
        href: '/app/investor/dashboard',
        role: ['investor']
      },
      {
        title: 'Cartera',
        icon: PieChartIcon,
        href: '/app/investor/portfolio',
        role: ['investor']
      },
    ]
  },
  {
    subheader: 'Reportes',
    role: ['admin', 'collection'],
    items: [
      {
        title: 'Resumen',
        icon: PieChartIcon,
        href: '/app/reports/dashboard',
        role: ['admin', 'collection']
      },
      {
        title: 'Cobranza',
        icon: ReceiptIcon,
        href: '/app/reports/collections',
        role: ['admin', 'collection'],
      },
      {
        title: 'Finanzas',
        icon: BarChartIcon,
        href: '/app/reports/dashboard-alternative',
        role: ['admin', 'collection'],
      },
      {
        title: 'Cartera',
        icon: TrendingUpIcon,
        href: '/app/reports/portfolio',
        role: ['admin', 'collection'],
      }
    ]
  },
  {
    subheader: 'Administración',
    role: ['admin', 'collection'],
    items: [
      {
        title: 'Clientes',
        icon: UsersIcon,
        href: '/app/management/customers',
        role: ['admin', 'collection'],
        items: [
          {
            title: 'Listado',
            href: '/app/management/customers',
            role: ['admin', 'collection'],
          },
          {
            title: 'Nuevo cliente',
            href: '/app/management/customers/create',
            role: ['admin', 'collection'],
          },
        ]
      },
      {
        title: 'Prestamos',
        icon: ShoppingCartIcon,
        href: '/app/management/products',
        role: ['admin', 'collection'],
        items: [
          {
            title: 'Listado de préstamos',
            href: '/app/management/loans',
            role: ['admin', 'collection'],
          },
          {
            title: 'Listado de cuotas',
            href: '/app/management/schedules',
            role: ['admin', 'collection'],
          },
        ]
      },
      // {
      //   title: 'Orders',
      //   icon: FolderIcon,
      //   href: '/app/management/orders',
      //   items: [
      //     {
      //       title: 'List Orders',
      //       href: '/app/management/orders'
      //     },
      //     {
      //       title: 'View Order',
      //       href: '/app/management/orders/1'
      //     }
      //   ]
      // },
      // {
      //   title: 'Invoices',
      //   icon: ReceiptIcon,
      //   href: '/app/management/invoices',
      //   items: [
      //     // {
      //     //   title: 'List Invoices',
      //     //   href: '/app/management/invoices'
      //     // },
      //     {
      //       title: 'View Invoice',
      //       href: '/app/management/invoices/1'
      //     }
      //   ]
      // }
    ]
  },
  // {
  //   subheader: 'Applications',
  //   items: [
  //     {
  //       title: 'Projects Platform',
  //       href: '/app/projects',
  //       icon: BriefcaseIcon,
  //       items: [
  //         {
  //           title: 'Overview',
  //           href: '/app/projects/overview'
  //         },
  //         {
  //           title: 'Browse Projects',
  //           href: '/app/projects/browse'
  //         },
  //         {
  //           title: 'Create Project',
  //           href: '/app/projects/create'
  //         },
  //         {
  //           title: 'View Project',
  //           href: '/app/projects/1'
  //         }
  //       ]
  //     },
  //     {
  //       title: 'Social Platform',
  //       href: '/app/social',
  //       icon: ShareIcon,
  //       items: [
  //         {
  //           title: 'Profile',
  //           href: '/app/social/profile'
  //         },
  //         {
  //           title: 'Feed',
  //           href: '/app/social/feed'
  //         }
  //       ]
  //     },
  //     {
  //       title: 'Kanban',
  //       href: '/app/kanban',
  //       icon: TrelloIcon
  //     },
  //     {
  //       title: 'Mail',
  //       href: '/app/mail',
  //       icon: MailIcon
  //     },
  //     {
  //       title: 'Chat',
  //       href: '/app/chat',
  //       icon: MessageCircleIcon,
  //       info: () => <Chip color="secondary" size="small" label="Updated" />
  //     },
  //     {
  //       title: 'Calendar',
  //       href: '/app/calendar',
  //       icon: CalendarIcon,
  //       info: () => <Chip color="secondary" size="small" label="Updated" />
  //     }
  //   ]
  // },
  // {
  //   subheader: 'Auth',
  //   items: [
  //     {
  //       title: 'Login',
  //       href: '/login-unprotected',
  //       icon: LockIcon
  //     },
  //     {
  //       title: 'Register',
  //       href: '/register-unprotected',
  //       icon: UserPlusIcon
  //     }
  //   ]
  // },
  {
    subheader: 'Herramientas',
    role: ['admin', 'collection'],
    items: [
      {
        title: 'Cotización',
        href: '/app/quote',
        icon: FileTextIcon,
        role: ['admin', 'collection'],
      },
      // {
      //   title: 'Error',
      //   href: '/404',
      //   icon: AlertCircleIcon
      // },
      // {
      //   title: 'Pricing',
      //   href: '/pricing',
      //   icon: DollarSignIcon
      // }
    ]
  },
  {
    subheader: 'Usuario',
    role: ['admin', 'collection'],
    items: [
      {
        title: 'Cuenta',
        href: '/app/account',
        icon: UserIcon,
        role: ['admin', 'collection'],
      },
      // {
      //   title: 'Error',
      //   href: '/404',
      //   icon: AlertCircleIcon
      // },
      // {
      //   title: 'Pricing',
      //   href: '/pricing',
      //   icon: DollarSignIcon
      // }
    ]
  },
  // {
  //   subheader: 'Extra',
  //   items: [
  //     {
  //       title: 'Charts',
  //       href: '/app/extra/charts',
  //       icon: BarChartIcon,
  //       items: [
  //         {
  //           title: 'Apex Charts',
  //           href: '/app/extra/charts/apex'
  //         }
  //       ]
  //     },
  //     {
  //       title: 'Forms',
  //       href: '/app/extra/forms',
  //       icon: EditIcon,
  //       items: [
  //         {
  //           title: 'Formik',
  //           href: '/app/extra/forms/formik'
  //         },
  //         {
  //           title: 'Redux Forms',
  //           href: '/app/extra/forms/redux'
  //         }
  //       ]
  //     },
  //     {
  //       title: 'Editors',
  //       href: '/app/extra/editors',
  //       icon: LayoutIcon,
  //       items: [
  //         {
  //           title: 'DraftJS Editor',
  //           href: '/app/extra/editors/draft-js'
  //         },
  //         {
  //           title: 'Quill Editor',
  //           href: '/app/extra/editors/quill'
  //         }
  //       ]
  //     }
  //   ]
  // }
];

function renderNavItems({ items, pathname, role, depth = 0 }) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc, item) => reduceChildRoutes({ acc, item, pathname, role, depth }),
        []
      )}
    </List>
  );
}

function reduceChildRoutes({ acc, pathname, item, role, depth }) {
  const key = item.title + depth;

  if (item.role.indexOf(role) >= 0) {
    if (item.items) {
      const open = matchPath(pathname, {
        path: item.href,
        exact: false
      });

      acc.push(
        <NavItem
          depth={depth}
          icon={item.icon}
          info={item.info}
          key={key}
          open={Boolean(open)}
          title={item.title}
        >
          {renderNavItems({
            depth: depth + 1,
            pathname,
            role,
            items: item.items
          })}
        </NavItem>
      );
    } else {
      acc.push(
        <NavItem
          depth={depth}
          href={item.href}
          icon={item.icon}
          info={item.info}
          key={key}
          title={item.title}
        />
      );
    }
  }



  return acc;
}

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <Hidden lgUp>
          <Box p={2} display="flex" justifyContent="center">
            <RouterLink to="/">
              <Logo />
            </RouterLink>
          </Box>
        </Hidden>
        <Box p={2}>
          <Box display="flex" justifyContent="center">
            <RouterLink to="/app/account">
              <Avatar alt="User" className={classes.avatar} src={user.avatar} />
            </RouterLink>
          </Box>
          <Box mt={2} textAlign="center">
            <Link
              component={RouterLink}
              to="/app/account"
              variant="h5"
              color="textPrimary"
              underline="none"
            >
              {user.firstName + ' ' + user.lastName}
            </Link>
            <Typography variant="body2" color="textSecondary">
              {`${user.role}`}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box p={2}>
          {sections.map(section => (
            (section.role.indexOf(user.role) >= 0) && <List
              key={section.subheader}
              subheader={
                <ListSubheader disableGutters disableSticky>
                  {section.subheader}
                </ListSubheader>
              }
            >
              {renderNavItems({
                items: section.items,
                pathname: location.pathname,
                role: user.role
              })}
            </List>
          ))}
        </Box>
        {/*<Divider />*/}
        {/*<Box p={2}>*/}
        {/*  <Box p={2} borderRadius="borderRadius" bgcolor="background.dark">*/}
        {/*    <Typography variant="h6" color="textPrimary">*/}
        {/*      Need Help?*/}
        {/*    </Typography>*/}
        {/*    <Link*/}
        {/*      variant="subtitle1"*/}
        {/*      color="secondary"*/}
        {/*      component={RouterLink}*/}
        {/*      to="/docs"*/}
        {/*    >*/}
        {/*      Check our docs*/}
        {/*    </Link>*/}
        {/*  </Box>*/}
        {/*</Box>*/}
      </PerfectScrollbar>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

export default NavBar;
