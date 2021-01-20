WITH offer_summary AS (
	SELECT product.code , product.price, product.description, product.num_code, offer.qty , ROUND( CAST(offer.qty * product.price AS Numeric),2)   AS product_cost
	FROM offer_products AS offer 
	LEFT OUTER JOIN pricelist AS product
	ON offer.product_id = product.id 
	WHERE offer.offer_id = {PARAMETER}
)

SELECT  SUM(offer_summary.product_cost) FROM offer_summary