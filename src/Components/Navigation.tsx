import React from 'react';
import { Nav, initializeIcons } from '@fluentui/react';
import { navprop } from '../Interface/interface';

const navigationStyles = {
  root: {
    height: '100vh',
    boxSizing: 'border-box',
    border: '1px solid #eee',
    overflowY: 'auto',
    paddingTop: '1vh',
  },
};

const links = [
  {
    links: [
      {
        name: 'Home',
        key:'key1',
        url: '/Navigation/Home',
        iconProps: {
          iconName: 'News',
          styles: {
            root: {
              fontSize: 20,
              color: '#106ebe',
            },
          }
        } 
      },
      {
        name: 'Categories',
        key: '80',
        url: '/Navigation/Categories',
        iconProps: {
          iconName: 'PlayerSettings',
          styles: {
            root: {
              fontSize: 20,
              color: '#106ebe',
            },
          }
        },      
      },
      {
        name: 'smartphones',
        key: '81',
        url: '/Navigation/smarphones',
        iconProps: {
          iconName: 'PlayerSettings',
          styles: {
            root: {
              fontSize: 20,
              color: '#106ebe',
            },
          }
        },      
      },
      {
        name: 'laptops',
        key: '82',
        url: '/Navigation/Laptops',
        iconProps: {
          iconName: 'PlayerSettings',
          styles: {
            root: {
              fontSize: 20,
              color: '#106ebe',
            },
          }
        },      
      },
      {
        name: 'fragnances',
        key: '83',
        url: '/Navigation/fragnances',
        iconProps: {
          iconName: 'PlayerSettings',
          styles: {
            root: {
              fontSize: 20,
              color: '#106ebe',
            },
          }
        },      
      },
      {
        name: 'skincare',
        key: '84',
        url: '/Navigation/skincare',
        iconProps: {
          iconName: 'PlayerSettings',
          styles: {
            root: {
              fontSize: 20,
              color: '#106ebe',
            },
          }
        },      
      },
      {
        name: 'groceries',
        key: '85',
        url: '/Navigation/groceries',
        iconProps: {
          iconName: 'PlayerSettings',
          styles: {
            root: {
              fontSize: 20,
              color: '#106ebe',
            },
          }
        },      
      },
      {
        name: 'home-decoration',
        key: '86',
        url: '/Navigation/home-decoration',
        iconProps: {
          iconName: 'PlayerSettings',
          styles: {
            root: {
              fontSize: 20,
              color: '#106ebe',
            },
          }
        },      
      },
      {
        name: 'furniture',
        key: '87',
        url: '/Navigation/furniture',
        iconProps: {
          iconName: 'PlayerSettings',
          styles: {
            root: {
              fontSize: 20,
              color: '#106ebe',
            },
          }
        },      
      },
      {
        name: 'tops',
        key: '88',
        url: '/Navigation/tops',
        iconProps: {
          iconName: 'PlayerSettings',
          styles: {
            root: {
              fontSize: 20,
              color: '#106ebe',
            },
          }
        },      
      },
      {
        name: 'women-dresses',
        key: '89',
        url: '/Navigation/women-dresses',
        iconProps: {
          iconName: 'PlayerSettings',
          styles: {
            root: {
              fontSize: 20,
              color: '#106ebe',
            },
          }
        },      
      },
      {
        name: 'women-shoes',
        key: '90',
        url: '/Navigation/women-shoes',
        iconProps: {
          iconName: 'PlayerSettings',
          styles: {
            root: {
              fontSize: 20,
              color: '#106ebe',
            },
          }
        },      
      },
      {
        name: 'mens-shirts',
        key: '91',
        url: '/Navigation/mens-shirts',
        iconProps: {
          iconName: 'PlayerSettings',
          styles: {
            root: {
              fontSize: 20,
              color: '#106ebe',
            },
          }
        },      
      },
      {
        name: 'mens-shoes',
        key: '92',
        url: '/Navigation/mens-shoes',
        iconProps: {
          iconName: 'PlayerSettings',
          styles: {
            root: {
              fontSize: 20,
              color: '#106ebe',
            },
          }
        },      
      },
      {
        name: 'mens-watches',
        key: '93',
        url: '/Navigation/mens-watches',
        iconProps: {
          iconName: 'PlayerSettings',
          styles: {
            root: {
              fontSize: 20,
              color: '#106ebe',
            },
          }
        },      
      },
      {
        name: 'womens-watches',
        key: '94',
        url: '/Navigation/women-watches',
        iconProps: {
          iconName: 'PlayerSettings',
          styles: {
            root: {
              fontSize: 20,
              color: '#106ebe',
            },
          }
        },      
      },
      {
        name: 'womens-bags',
        key: '95',
        url: '/Navigation/womens-bags',
        iconProps: {
          iconName: 'PlayerSettings',
          styles: {
            root: {
              fontSize: 20,
              color: '#106ebe',
            },
          }
        },      
      },
      {
        name: 'womens-jewellery',
        key: '96',
        url: '/Navigation/womens-jewellery',
        iconProps: {
          iconName: 'PlayerSettings',
          styles: {
            root: {
              fontSize: 20,
              color: '#106ebe',
            },
          }
        },      
      },
      {
        name: 'sunglasses',
        key: '97',
        url: '/Navigation/sunglasses',
        iconProps: {
          iconName: 'PlayerSettings',
          styles: {
            root: {
              fontSize: 20,
              color: '#106ebe',
            },
          }
        },      
      },
      {
        name: 'automotive',
        key: '98',
        url: '/Navigation/automotive',
        iconProps: {
          iconName: 'PlayerSettings',
          styles: {
            root: {
              fontSize: 20,
              color: '#106ebe',
            },
          }
        },      
      },
      {
        name: 'motorcycle',
        key: '99',
        url: '/Navigation/motorcycle',
        iconProps: {
          iconName: 'PlayerSettings',
          styles: {
            root: {
              fontSize: 20,
              color: '#106ebe',
            },
          }
        },      
      },
      {
        name: 'lightening',
        key: '100',
        url: '/Navigation/lightening',
        iconProps: {
          iconName: 'PlayerSettings',
          styles: {
            root: {
              fontSize: 20,
              color: '#106ebe',
            },
          }
        },      
      },    
    ],
  },
  
];


const Navigation: React.FC<navprop> = ({onselect}) => {
  initializeIcons();
  function linkclicked(evt: any, item: any) {

    if (item !== null) {
      debugger;
      console.log("link clicked yes");
      onselect(item.name);
   
    }
  }


  return (
    <div className="ms-Grid-col ms-sm1 ms-xl1">
      <Nav
        groups={links}
        selectedKey="key1"
        styles={navigationStyles}
        onLinkClick={linkclicked}
        
      />
    </div>
  );
};


export default Navigation;