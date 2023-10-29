import React from 'react';
import './style.css';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
 
export default function ReportData() {
  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);

  const downloadPDF = () =>{
    console.log('jhf');
    const capture = document.querySelector('.actual-receipt');
    html2canvas(capture).then((canvas)=>{
      const imgData = canvas.toDataURL('img/png');
      const doc = new jsPDF('p', 'mm', 'a4');
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
      doc.save('invoice.pdf');
    })
  }
 
  return (
    <div className='bodydata'>
      <Button onClick={handleOpen}>Report Data</Button>
      <Dialog open={open} handler={handleOpen} className='' style={{minWidth:'70%'}}>
        <DialogHeader>Report Data</DialogHeader>
        <DialogBody className="h-[38rem] overflow-y-scroll actual-receipt">
        <div className="invoice w-full">
            <header className="clearfix invoiceheader">
                <div id="logo">
                <img  alt="Company Logo" />
                </div>
                <div id="company">
                <h2 className="name">Company Name</h2>
                <div>455 Foggy Heights, AZ 85004, US</div>
                <div>(602) 519-0450</div>
                <div>
                    <a href="mailto:company@example.com">company@example.com</a>
                </div>
                </div>
            </header>
            <main>
                <div id="details" className="clearfix">
                <div id="client">
                    <div className="to">INVOICE TO:</div>
                    <h2 className="name">John Doe</h2>
                    <div className="address">796 Silver Harbour, TX 79273, US</div>
                    <div>
                    <a href="mailto:john@example.com">john@example.com</a>
                    </div>
                </div>
                <div id="invoice">
                    <h1>INVOICE 3-2-1</h1>
                    <div className="date">Date of Invoice: 01/06/2014</div>
                    <div className="date">Due Date: 30/06/2014</div>
                </div>
                </div>
                <table border="0" cellSpacing="0" cellPadding="0">
                <thead>
                    <tr>
                    <th className="no">#</th>
                    <th className="desc">DESCRIPTION</th>
                    <th className="unit">UNIT PRICE</th>
                    <th className="qty">QUANTITY</th>
                    <th className="total">TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td className="no">01</td>
                    <td className="desc">
                        <h3>Website Design</h3>Creating a recognizable design solution
                        based on the company's existing visual identity
                    </td>
                    <td className="unit">$40.00</td>
                    <td className="qty">30</td>
                    <td className="total">$1,200.00</td>
                    </tr>
                    <tr>
                    <td className="no">02</td>
                    <td className="desc">
                        <h3>Website Development</h3>Developing a Content Management
                        System-based Website
                    </td>
                    <td className="unit">$40.00</td>
                    <td className="qty">80</td>
                    <td className="total">$3,200.00</td>
                    </tr>
                    <tr>
                    <td className="no">03</td>
                    <td className="desc">
                        <h3>Search Engines Optimization</h3>Optimize the site for search
                        engines (SEO)
                    </td>
                    <td className="unit">$40.00</td>
                    <td className="qty">20</td>
                    <td className="total">$800.00</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                    <td colSpan="2"></td>
                    <td colSpan="2">SUBTOTAL</td>
                    <td>$5,200.00</td>
                    </tr>
                    <tr>
                    <td colSpan="2"></td>
                    <td colSpan="2">TAX 25%</td>
                    <td>$1,300.00</td>
                    </tr>
                    <tr>
                    <td colSpan="2"></td>
                    <td colSpan="2">GRAND TOTAL</td>
                    <td>$6,500.00</td>
                    </tr>
                </tfoot>
                </table>
                <div id="thanks">Thank you!</div>
                <div id="notices">
                <div>NOTICE:</div>
                <div className="notice">
                    A finance charge of 1.5% will be made on unpaid balances after 30
                    days.
                </div>
                </div>
            </main>
            <footer className='invoicefooter'>
                Invoice was created on a computer and is valid without the signature and
                seal.
            </footer>
            </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="blue-gray" onClick={handleOpen}>
            cancel
          </Button>
          <Button variant="gradient" color="green" onClick={downloadPDF}>
            confirm
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
