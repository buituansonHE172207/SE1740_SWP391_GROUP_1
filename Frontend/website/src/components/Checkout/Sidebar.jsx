import React from 'react'

const Sidebar = ({ cart }) => {
  return (
    <div className='sidebar'>
      <div className="sidebar-content">
        <div className="order-summary-sections order-summary-section-product-list">
          {
            cart.orderDetails?.map(item => (
              <div className="product" key={item.id}>
                <div className="product-image">
                  <div className="product-thumbnail">
                    <div className="product-thumbnail-wrapper">
                      <img src={item.book.images[0].link} alt={item.book.title} />
                    </div>
                    <span className="product-thumbnail-quantity">{item.amount}</span>
                  </div>
                </div>
                <div className="product-description">
                  <span className="product-description-name">{item.book.title}</span>
                </div>
                <div className="product-price">
                  <span className="order-summary-emphasis">
                    {item.book.salePrice.toLocaleString()}₫
                  </span>
                </div>
              </div>
            ))
          }

          <div>
            <div class="total-line total-line-subtotal">
              <span class="total-line-name">Tạm tính</span>
              <span class="total-line-price">
                <span class="order-summary-emphasis">
                  {cart.orderDetails?.reduce((total, item) => total + item.book.salePrice * item.amount, 0)?.toLocaleString()}₫
                </span>
              </span>
            </div>
            <div class="total-line total-line-shipping">
              <span class="total-line-name">Phí ship</span>
              <span class="total-line-price">
                <span class="order-summary-emphasis">
                  {cart.shippingPrice?.toLocaleString()}₫
                </span>
              </span>
            </div>
          </div>

          <div className='total-line'>
            <div className="total-line-name">
              <span className="payment-due-label-total">
                Tổng tiền
              </span>
            </div>
            <div class="total-line-name">
              <span class="payment-due-currency">VND</span>
              <span class="payment-due-price">
                {(cart.orderDetails?.reduce((total, item) => total + item.book.salePrice * item.amount, 0) + cart.shippingPrice)?.toLocaleString()}₫
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar