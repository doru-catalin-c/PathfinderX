﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PathfinderX.Controllers
{
    public class ErrorController : Controller
    {
        // GET: Error
        public ActionResult Unexpected()
        {
            return View();
        }

        public ActionResult NotFound()
        {
            Response.StatusCode = 404;
            return View();
        }

        public ActionResult Unauthorized()
        {
            Response.StatusCode = 401;
            return View();
        }

        public ActionResult ServerError()
        {
            Response.StatusCode = 500;
            return View();
        }
    }
}