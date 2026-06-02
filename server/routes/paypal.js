const express = require('express');
const router = express.Router();

const PLANS = {
  starter: { name: 'Starter', price: 9.99, minutes: 10 },
  creator: { name: 'Creator', price: 29.99, minutes: 40 },
  pro: { name: 'Pro', price: 59.99, minutes: 90 },
};

/**
 * POST /api/paypal/create-subscription
 * Body: { planId }
 * Returns: { approvalUrl, subscriptionId }
 */
router.post('/create-subscription', async (req, res) => {
  try {
    const { planId } = req.body;

    if (!planId || !PLANS[planId]) {
      return res.status(400).json({ error: 'Invalid plan ID. Must be one of: starter, creator, pro' });
    }

    const plan = PLANS[planId];

    // In production: use PayPal SDK to create a subscription and return the real approval URL
    // const paypalClient = new PayPalClient(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET);
    // const subscription = await paypalClient.subscriptions.create({ ... });
    // return res.json({ approvalUrl: subscription.links.find(l => l.rel === 'approve').href });

    // Mock response
    const mockSubscriptionId = `SUB_${Date.now()}_${planId.toUpperCase()}`;
    const mockApprovalUrl = `https://www.sandbox.paypal.com/webapps/billing/subscriptions/activate?subscription_id=${mockSubscriptionId}`;

    res.json({
      success: true,
      subscriptionId: mockSubscriptionId,
      approvalUrl: mockApprovalUrl,
      plan: plan.name,
      price: plan.price,
      minutes: plan.minutes,
    });
  } catch (err) {
    console.error('[paypal] create-subscription error:', err.message);
    res.status(500).json({ error: 'Failed to create PayPal subscription', details: err.message });
  }
});

/**
 * POST /api/paypal/webhook
 * Handles PayPal subscription events: BILLING.SUBSCRIPTION.ACTIVATED, BILLING.SUBSCRIPTION.CANCELLED
 */
router.post('/webhook', async (req, res) => {
  try {
    const { event_type, resource } = req.body;

    console.log(`[paypal] Webhook received: ${event_type}`);

    switch (event_type) {
      case 'BILLING.SUBSCRIPTION.ACTIVATED':
        // In production: update user plan in Supabase
        console.log(`[paypal] Subscription activated: ${resource?.id}`);
        break;

      case 'BILLING.SUBSCRIPTION.CANCELLED':
        // In production: downgrade user plan in Supabase
        console.log(`[paypal] Subscription cancelled: ${resource?.id}`);
        break;

      case 'BILLING.SUBSCRIPTION.EXPIRED':
        console.log(`[paypal] Subscription expired: ${resource?.id}`);
        break;

      default:
        console.log(`[paypal] Unhandled event: ${event_type}`);
    }

    res.json({ received: true });
  } catch (err) {
    console.error('[paypal] Webhook error:', err.message);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

module.exports = router;
