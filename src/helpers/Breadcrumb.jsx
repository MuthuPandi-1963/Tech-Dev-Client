import React from 'react'
import { Link, useLocation } from "react-router-dom";
import { Breadcrumbs, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CategoryIcon from '@mui/icons-material/Category';
import StoreIcon from '@mui/icons-material/Store';
const Breadcrumb = () => {
    const location = useLocation()
    const pathName = location.pathname?.split("/").slice(1,);
    console.log(pathName);
    const BreadCrumbItems = {
      Home: {
      name: "Home",
      link: "/",
    },
    Products : {
        name : "Products",
        link : "/shopping/products"
    },
    Category : {
        name :"Categories",
        link : "/shopping/category"
    },
    Brands : {
        name : "Brands",
        link : "/shopping/brand"
    },
    Trending : {
        name :"Trending",
        link : "/shopping/trending"
    },
    CategoryItem :{
        name : "",
        link : "/shopping/category/"
    },
    BrandItem :{
        name : "",
        link : "/shopping/category/"
    }
};
const {
    Home,Products, Category,CategoryItem,Brands,BrandItem,Trending
} = BreadCrumbItems
const BCItems = [Home]
  if (pathName[0] === "shopping") {
    switch (pathName[1]) {
        case "products":
            BCItems.push(Products)
            break;
        case "category":
            BCItems.push(Category)
            if(pathName[2])
            {
                BCItems.push({
                    name : pathName[2].split("_")[1].replaceAll("%20"," "),
                    link : "/shopping/products/"
                })
            }
            break;
            case "brand":
                BCItems.push(Brands)
                if(pathName[2])
                    {
                        BCItems.push({
                            name : pathName[2].split("_")[1],
                            link : "/shopping/products/"
                        })
                    }
                break;
            case "trending":
                BCItems.push(Trending)
                break;
        default:
            break;
    }

  }
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="large" />}
      aria-label="breadcrumb"
      sx={{ padding: '16px', backgroundColor: '#f9f9f9', borderRadius: '0px' }}
      className=''
    >
      {BCItems.map((item, index) => (
        <React.Fragment key={index}>
          {index === 0 ? (
            <Link
              to={item.link}
              style={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: 'darkblue',
                
              }}
            >
              <HomeIcon sx={{ mr: 0.5 }} fontSize="medium" />
              {item.name}
            </Link>
          ) : index < BCItems.length - 1 ? (
            <Link
              to={item.link}
              style={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: 'darkblue',
              }}
            >
              {item.name === 'Categories' && (
                <CategoryIcon sx={{ mr: 0.5 }} fontSize="medium" />
              )}
              {item.name === 'Brands' && (
                <StoreIcon sx={{ mr: 0.5 }} fontSize="medium" />
              )}
              {item.name}
            </Link>
          ) : (
            <Typography
              color="text.primary"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              {item.name === 'Categories' && (
                <CategoryIcon sx={{ mr: 0.5 }} fontSize="medium" />
              )}
              {item.name === 'Brands' && (
                <StoreIcon sx={{ mr: 0.5 }} fontSize="medium"  />
              )}
              {item.name}
            </Typography>
          )}
        </React.Fragment>
      ))}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
