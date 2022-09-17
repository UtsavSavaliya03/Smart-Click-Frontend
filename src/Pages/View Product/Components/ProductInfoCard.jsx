import React from 'react';
import currencyFormatter from 'currency-formatter';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function ProductInfoCard(props) {

    const loading = props.loading;
    const product = props.product;

    const formatCurrency = (currency) => {
        return (
            currencyFormatter.format(currency, { code: 'INR' })
        )
    }

    const textLoader = () => {
        return (
            <Skeleton count={3} height={'30px'} />
        )
    }

    return (
        <div>
            {loading ? (
                textLoader()
            ) : (
                <div>
                    <div>
                        <h4>{product.name}</h4>
                    </div>
                    <div>
                        <h6 className="text-success">{`Extra ${formatCurrency(product.extraOff)} off`}</h6>
                    </div>
                    <div>
                        <h4>{formatCurrency(product.rate)}</h4>
                        <span className="text-muted mr-3"><del>{formatCurrency(product.price)}</del></span>
                        <span className="text-success ps-4">{`${product.discount}% off`}</span>
                    </div>
                </div>
            )}
        </div>
    )
}