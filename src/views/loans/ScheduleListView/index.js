import React, {
} from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import Results from './Results';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: 100
  }
}));

const ProductListView = () => {
  const classes = useStyles();
  // const isMountedRef = useIsMountedRef();
  // const [products, setProducts] = useState([]);
  //
  // const getProducts = useCallback(async () => {
  //   try {
  //     const response = await axios.get('/api/products');
  //
  //     if (isMountedRef.current) {
  //       setProducts(response.data.products);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }, [isMountedRef]);
  //
  // useEffect(() => {
  //   getProducts();
  // }, [getProducts]);

  return (
    <Page
      className={classes.root}
      title="Ribo | Cronogramas"
    >
      <Container maxWidth={false}>
        <Header />
        {/*{products && (*/}
          <Box mt={3}>
            <Results  />
          </Box>
        {/*)}*/}
      </Container>
    </Page>
  );
};

export default ProductListView;
