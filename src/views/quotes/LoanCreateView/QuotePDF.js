import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import numeral from 'numeral';
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet
} from '@react-pdf/renderer';
import { loanScheduleCalculator } from '../../../utils/calculator';
import { currencyFormat } from '../../../utils/numbers';

const COL1_WIDTH = 10;
const COLN_WIDTH = (100 - COL1_WIDTH) / 4;

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    padding: 24
  },
  h1: {
    fontSize: 24,
    fontWeight: 500
  },
  h5: {
    fontSize: 12,
    fontWeight: 500
  },
  h6: {
    fontSize: 10,
    fontWeight: 500
  },
  body1: {
    fontSize: 9,
    lineHeight: 1.5
  },
  body2: {
    fontSize: 8,
    lineHeight: 1.5
  },
  ct: {
    textAlign: 'center',
  },
  mt1: {
    marginTop: 4
  },
  mb1: {
    marginBottom: 4
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  brand: {
    height: 24,
    width: 24
  },
  company: {
    marginTop: 32,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  references: {
    marginTop: 32,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  billing: {
    marginTop: 32
  },
  items: {
    marginTop: 32
  },
  notes: {
    marginTop: 32
  },
  table: {
    display: 'flex',
    width: 'auto'
  },
  tableHeader: {},
  tableBody: {},
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#eeeeee',
    borderStyle: 'solid'
  },
  tableCell1: {
    padding: 6,
    width: `${COL1_WIDTH}%`
  },
  tableCellN: {
    padding: 6,
    width: `${COLN_WIDTH}%`
  },
  alignRight: {
    textAlign: 'right'
  }
});

const quotes = [
  {
    date: 10,
    interest: 100,
    capital: 10,
    installment: 110
  },
  {
    date: 10,
    interest: 100,
    capital: 10,
    installment: 110
  },
  {
    date: 10,
    interest: 100,
    capital: 10,
    installment: 110
  },
  {
    date: 10,
    interest: 100,
    capital: 10,
    installment: 110
  },
  {
    date: 10,
    interest: 100,
    capital: 10,
    installment: 110
  }
]

const InvoicePDF = (props) => {
  console.log('adentro: ', props)



  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Image
              source="/static/logo.jpg"
              style={styles.brand}
            />
          </View>
          <View>
            <Text style={styles.h5}>
              Ribo Capital, SAC
            </Text>
            <Text style={[styles.body2, styles.mt1]}>
              RUC: 20604543585
            </Text>
            <Text style={styles.body2}>
              http://www.ribo.pe
            </Text>
          </View>
          {/*<View>*/}
          {/*  <Text style={styles.h5}>*/}
          {/*    Cotización*/}
          {/*  </Text>*/}
          {/*  <Text style={styles.h5}>*/}
          {/*    {'Cliente: '}*/}
          {/*    {quote.name}*/}
          {/*  </Text>*/}
          {/*</View>*/}
        </View>
        <View style={styles.company}>
          <View>
            <Text style={styles.body1}>
              Av. Jose Larco 880, piso 11
            </Text>
            <Text style={styles.body1}>
              Miraflores
            </Text>
            <Text style={styles.body1}>
              Lima, Peru
            </Text>
            <Text style={[styles.body1]}>
              Email: prestamos@ribo.pe
            </Text>
            <Text style={[styles.body1]}>
              {'Tel: (+51) 992 797770'}
            </Text>
          </View>
        </View>
        <View>
            <Text style={[styles.h1, styles.mt1, styles.ct]}>
              Cotización de crédito
            </Text>
        </View>
        <View style={styles.references}>
          <View>
            <Text style={[styles.h5, styles.mb1]}>
              Fecha de cotización
            </Text>
            <Text style={styles.body1}>
              {moment().format('DD MMM YYYY')}
            </Text>
          </View>
          <View>
            <Text style={[styles.h5, styles.mb1]}>
              Tasa de interes
            </Text>
            <Text style={styles.body1}>
              {`${props.interestRate}% mensual`}
            </Text>
          </View>
          <View>
            <Text style={[styles.h5, styles.mb1]}>
              Monto
            </Text>
            <Text style={styles.body1}>
              {currencyFormat(props.capital, '$')}
            </Text>
          </View>
          <View>
            <Text style={[styles.h5, styles.mb1]}>
              Número de cuotas
            </Text>
            <Text style={styles.body1}>
              {props.numberOfInstallments}
            </Text>
          </View>
        </View>
        <View style={styles.billing}>
          <Text style={[styles.h5, styles.mb1]}>
            Cliente:
          </Text>
          <Text style={styles.body1}>
            {props.fullName}
          </Text>
          {/*<Text style={styles.body1}>*/}
          {/*  Countdown Grey Lynn*/}
          {/*</Text>*/}
          {/*<Text style={styles.body1}>*/}
          {/*  6934656584231*/}
          {/*</Text>*/}
          {/*<Text style={styles.body1}>*/}
          {/*  271 Richmond Rd, Grey Lynn, Auckland 1022, New Zealand*/}
          {/*</Text>*/}
        </View>
        <View style={styles.items}>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <View style={styles.tableRow}>
                <View style={styles.tableCell1}>
                  <Text style={styles.h6}>
                    #
                  </Text>
                </View>
                <View style={styles.tableCellN}>
                  <Text style={styles.h6}>
                    Fecha
                  </Text>
                </View>
                <View style={styles.tableCellN} >
                  <Text style={[styles.h6, styles.alignRight]}>
                    Interes
                  </Text>
                </View>
                <View style={styles.tableCellN} >
                  <Text style={[styles.h6, styles.alignRight]}>
                    Capital
                  </Text>
                </View>
                <View style={styles.tableCellN}>
                  <Text style={[styles.h6, styles.alignRight]}>
                    Cuota
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.tableBody}>
              {props.schedule.map((row, i) => {
                if (i === 0) return
                return (
                <View
                  style={styles.tableRow}
                  key={i}
                >
                  <View style={styles.tableCell1}>
                    <Text style={styles.body2}>
                      {i}
                    </Text>
                  </View>
                  <View style={styles.tableCellN}>
                    <Text style={styles.body2}>
                      {row.date}
                    </Text>
                  </View>
                  <View style={styles.tableCellN}>
                    <Text style={[styles.body2, styles.alignRight]}>
                      {currencyFormat(row.interest, '$')}
                    </Text>
                  </View>
                  <View style={styles.tableCellN}>
                    <Text style={[styles.body2, styles.alignRight]}>
                      {currencyFormat(row.principal, '$')}

                    </Text>
                  </View>
                  <View style={styles.tableCellN}>
                    <Text style={[styles.body2, styles.alignRight]}>
                      {currencyFormat(row.payment, '$')}
                    </Text>
                  </View>
                </View>
              )})}
        {/*      <View style={styles.tableRow}>*/}
        {/*        <View style={styles.tableCell1} />*/}
        {/*        <View style={styles.tableCellN}>*/}
        {/*          <Text style={styles.body2}>*/}
        {/*            Subtotal*/}
        {/*          </Text>*/}
        {/*        </View>*/}
        {/*        <View style={styles.tableCellN}>*/}
        {/*          <Text style={[styles.body2, styles.alignRight]}>*/}
        {/*            {numeral(0).format(`0,0.00`)}*/}
        {/*          </Text>*/}
        {/*        </View>*/}
        {/*      </View>*/}
        {/*      <View style={styles.tableRow}>*/}
        {/*        <View style={styles.tableCell1} />*/}
        {/*        <View style={styles.tableCellN}>*/}
        {/*          <Text style={styles.body2}>*/}
        {/*            Taxes*/}
        {/*          </Text>*/}
        {/*        </View>*/}
        {/*        <View style={styles.tableCellN}>*/}
        {/*          <Text style={[styles.body2, styles.alignRight]}>*/}
        {/*            {numeral(0).format(`0,0.00`)}*/}
        {/*          </Text>*/}
        {/*        </View>*/}
        {/*      </View>*/}
        {/*      <View style={styles.tableRow}>*/}
        {/*        <View style={styles.tableCell1} />*/}
        {/*        <View style={styles.tableCellN}>*/}
        {/*          <Text style={styles.body2}>*/}
        {/*            Total*/}
        {/*          </Text>*/}
        {/*        </View>*/}
        {/*        <View style={styles.tableCellN}>*/}
        {/*          <Text style={[styles.body2, styles.alignRight]}>*/}
        {/*            {numeral(0).format(`0,0.00`)}*/}
        {/*          </Text>*/}
        {/*        </View>*/}
        {/*      </View>*/}
            </View>
          </View>
        </View>
        {/*<View style={styles.notes}>*/}
        {/*  <Text style={[styles.h5, styles.mb1]}>*/}
        {/*    Notes*/}
        {/*  </Text>*/}
        {/*  <Text style={styles.body1}>*/}
        {/*    Please make sure you have the right bank registration number as I*/}
        {/*    had issues before and make sure you guys cover transfer expenses.*/}
        {/*    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab asperiores at cumque cupiditate dolorem*/}
        {/*      nulla numquam optio. Atque blanditiis cumque iure voluptates. Fuga, iste nisi! Eos ex odio quidem*/}
        {/*      recusandae!</p><p>Accusamus alias aperiam atque deserunt dolore dolorum eligendi error facilis fugiat*/}
        {/*    illo, inventore ipsam iste magni maiores necessitatibus officiis placeat praesentium quae qui quibusdam quis*/}
        {/*    reiciendis rem saepe sequi velit?</p><p>Ab amet commodi dolor officia rerum ut voluptas. Accusamus aliquid*/}
        {/*    asperiores eaque eos expedita facilis impedit incidunt ipsa iste laboriosam modi molestias porro*/}
        {/*    reprehenderit rerum sed, sint ut veritatis voluptatem.</p><p>A architecto consequuntur debitis ea eveniet*/}
        {/*    excepturi illum iusto maxime nam nemo nihil nisi non nostrum odio, pariatur praesentium quas quibusdam quis*/}
        {/*    ratione repudiandae rerum sequi, sint totam ut veritatis?</p>*/}
        {/*    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab asperiores at cumque cupiditate dolorem*/}
        {/*      nulla numquam optio. Atque blanditiis cumque iure voluptates. Fuga, iste nisi! Eos ex odio quidem*/}
        {/*      recusandae!</p><p>Accusamus alias aperiam atque deserunt dolore dolorum eligendi error facilis fugiat*/}
        {/*    illo, inventore ipsam iste magni maiores necessitatibus officiis placeat praesentium quae qui quibusdam quis*/}
        {/*    reiciendis rem saepe sequi velit?</p><p>Ab amet commodi dolor officia rerum ut voluptas. Accusamus aliquid*/}
        {/*    asperiores eaque eos expedita facilis impedit incidunt ipsa iste laboriosam modi molestias porro*/}
        {/*    reprehenderit rerum sed, sint ut veritatis voluptatem.</p><p>A architecto consequuntur debitis ea eveniet*/}
        {/*    excepturi illum iusto maxime nam nemo nihil nisi non nostrum odio, pariatur praesentium quas quibusdam quis*/}
        {/*    ratione repudiandae rerum sequi, sint totam ut veritatis?</p>*/}
        {/*  </Text>*/}
        {/*</View>*/}
      </Page>
    </Document>
  );
}

InvoicePDF.propTypes = {
  invoice: PropTypes.object.isRequired
};

export default InvoicePDF;
