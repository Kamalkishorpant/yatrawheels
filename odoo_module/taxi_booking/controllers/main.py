# -*- coding: utf-8 -*-
from odoo import http
from odoo.http import request
import os
import logging

_logger = logging.getLogger(__name__)

class TaxiBookingController(http.Controller):
    
    @http.route('/shop', type='http', auth='public', website=True)
    def taxi_booking_page(self, **kw):
        """
        Main route for the taxi booking app
        Serves the React frontend directly
        """
        # Get the path to our HTML file
        module_path = os.path.dirname(__file__)
        html_path = os.path.join(module_path, '..', 'static', 'taxi', 'index.html')
        
        try:
            with open(html_path, 'r', encoding='utf-8') as file:
                html_content = file.read()
            
            # Return HTML directly
            return request.make_response(
                html_content,
                headers=[
                    ('Content-Type', 'text/html'),
                    ('Access-Control-Allow-Origin', '*'),
                    ('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'),
                    ('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With'),
                ]
            )
        except Exception as e:
            _logger.error(f"Error serving taxi booking page: {e}")
            return request.not_found()
    
    @http.route('/shop/<path:path>', type='http', auth='public', website=True)
    def taxi_assets(self, path, **kw):
        """
        Route for all sub-paths in the taxi booking app
        Allows React router to handle client-side routing
        """
        return self.taxi_booking_page(**kw)
    
    @http.route('/taxi_booking/static/taxi/assets/<path:filename>', type='http', auth='public')
    def serve_assets(self, filename, **kw):
        """
        Serve static assets (CSS, JS files)
        """
        module_path = os.path.dirname(__file__)
        asset_path = os.path.join(module_path, '..', 'static', 'taxi', 'assets', filename)
        
        try:
            # Determine content type
            if filename.endswith('.css'):
                content_type = 'text/css'
            elif filename.endswith('.js'):
                content_type = 'application/javascript'
            elif filename.endswith('.js.map'):
                content_type = 'application/json'
            else:
                content_type = 'text/plain'
            
            with open(asset_path, 'r', encoding='utf-8') as file:
                content = file.read()
            
            return request.make_response(
                content,
                headers=[
                    ('Content-Type', content_type),
                    ('Access-Control-Allow-Origin', '*'),
                ]
            )
        except Exception as e:
            _logger.error(f"Error serving asset {filename}: {e}")
            return request.not_found()
    
    # API Endpoints for CORS headers
    @http.route(['/web/session/authenticate',
                '/web/dataset/call_kw',
                '/web/dataset/call',
                '/web/dataset/search_read'], 
                type='http', auth="none", csrf=False, cors="*", save_session=True)
    def taxi_api_cors(self, **kw):
        """
        Add CORS headers to API endpoints for the taxi booking app
        """
        # Let Odoo handle the actual request
        response = request.env['ir.http']._dispatch()
        
        # Add CORS headers
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
            'Access-Control-Allow-Credentials': 'true'
        }
        
        # Apply headers to response
        for key, value in headers.items():
            response.headers[key] = value
            
        return response