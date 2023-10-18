package com.kas.online_book_shop.service.email;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HtmlContent {
    public String setHtmlConten(String fullName, String buttonName, String url, String firstMessage,
            String secondMessage, String endMessage) {
        String imageUrl = "https://raw.githubusercontent.com/nguyenlghe176558/images/main/OBS/379935635_1432726451012002_4956856701430026366_n.png";
        String content = "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional //EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\n"
                + //
                "<html xmlns=\"http://www.w3.org/1999/xhtml\" xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\">\n"
                + //
                "<head>\n" + //
                "\n" + //
                "  <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\n" + //
                "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" + //
                "  <meta name=\"x-apple-disable-message-reformatting\">\n" + //
                "  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n" + //
                "  <title></title>\n" + //
                "  \n" + //
                "    <style type=\"text/css\">\n" + //
                "      @media only screen and (min-width: 620px) {\n" + //
                "  .u-row {\n" + //
                "    width: 600px !important;\n" + //
                "  }\n" + //
                "  .u-row .u-col {\n" + //
                "    vertical-align: top;\n" + //
                "  }\n" + //
                "\n" + //
                "  .u-row .u-col-100 {\n" + //
                "    width: 600px !important;\n" + //
                "  }\n" + //
                "\n" + //
                "}\n" + //
                "\n" + //
                "@media (max-width: 620px) {\n" + //
                "  .u-row-container {\n" + //
                "    max-width: 100% !important;\n" + //
                "    padding-left: 0px !important;\n" + //
                "    padding-right: 0px !important;\n" + //
                "  }\n" + //
                "  .u-row .u-col {\n" + //
                "    min-width: 320px !important;\n" + //
                "    max-width: 100% !important;\n" + //
                "    display: block !important;\n" + //
                "  }\n" + //
                "  .u-row {\n" + //
                "    width: 100% !important;\n" + //
                "  }\n" + //
                "  .u-col {\n" + //
                "    width: 100% !important;\n" + //
                "  }\n" + //
                "  .u-col > div {\n" + //
                "    margin: 0 auto;\n" + //
                "  }\n" + //
                "}\n" + //
                "body {\n" + //
                "  margin: 0;\n" + //
                "  padding: 0;\n" + //
                "}\n" + //
                "\n" + //
                "table,\n" + //
                "tr,\n" + //
                "td {\n" + //
                "  vertical-align: top;\n" + //
                "  border-collapse: collapse;\n" + //
                "}\n" + //
                "\n" + //
                "p {\n" + //
                "  margin: 0;\n" + //
                "}\n" + //
                "\n" + //
                ".ie-container table,\n" + //
                ".mso-container table {\n" + //
                "  table-layout: fixed;\n" + //
                "}\n" + //
                "\n" + //
                "* {\n" + //
                "  line-height: inherit;\n" + //
                "}\n" + //
                "\n" + //
                "a[x-apple-data-detectors='true'] {\n" + //
                "  color: inherit !important;\n" + //
                "  text-decoration: none !important;\n" + //
                "}\n" + //
                "\n" + //
                "table, td { color: #000000; } #u_body a { color: #161a39; text-decoration: underline; }\n" + //
                "    </style>\n" + //
                "  \n" + //
                "  \n" + //
                "\n" + //
                "<link href=\"https://fonts.googleapis.com/css?family=Lato:400,700&display=swap\" rel=\"stylesheet\" type=\"text/css\"><!--<![endif]-->\n"
                + //
                "\n" + //
                "</head>\n" + //
                "\n" + //
                "<body class=\"clean-body u_body\" style=\"margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ffffff;color: #000000\">\n"
                + //
                "\n" + //
                "  <table id=\"u_body\" style=\"border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ffffff;width:100%\" cellpadding=\"0\" cellspacing=\"0\">\n"
                + //
                "  <tbody>\n" + //
                "  <tr style=\"vertical-align: top\">\n" + //
                "    <td style=\"word-break: break-word;border-collapse: collapse !important;vertical-align: top\">\n" + //
                "    \n" + //
                "  \n" + //
                "  \n" + //
                "<div class=\"u-row-container\" style=\"padding: 0px;background-color: #f9f9f9\">\n" + //
                "  <div class=\"u-row\" style=\"margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #f9f9f9;\">\n"
                + //
                "    <div style=\"border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;\">\n"
                + //
                "      \n" + //
                "<div class=\"u-col u-col-100\" style=\"max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;\">\n"
                + //
                "  <div style=\"height: 100%;width: 100% !important;\">\n" + //
                "<div style=\"box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;\"><!--<![endif]-->\n"
                + //
                "  \n" + //
                "<table style=\"font-family:'Lato',sans-serif;\" role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" border=\"0\">\n"
                + //
                "  <tbody>\n" + //
                "    <tr>\n" + //
                "      <td style=\"overflow-wrap:break-word;word-break:break-word;padding:15px;font-family:'Lato',sans-serif;\" align=\"left\">\n"
                + //
                "        \n" + //
                "  <table height=\"0px\" align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #f9f9f9;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%\">\n"
                + //
                "    <tbody>\n" + //
                "      <tr style=\"vertical-align: top\">\n" + //
                "        <td style=\"word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%\">\n"
                + //
                "          <span>&#160;</span>\n" + //
                "        </td>\n" + //
                "      </tr>\n" + //
                "    </tbody>\n" + //
                "  </table>\n" + //
                "\n" + //
                "      </td>\n" + //
                "    </tr>\n" + //
                "  </tbody>\n" + //
                "</table>\n" + //
                "</div>\n" + //
                "  </div>\n" + //
                "</div>\n" + //
                "\n" + //
                "    </div>\n" + //
                "  </div>\n" + //
                "  </div>\n" + //
                "  \n" + //
                "\n" + //
                "\n" + //
                "  \n" + //
                "  \n" + //
                "<div class=\"u-row-container\" style=\"padding: 0px;background-color: transparent\">\n" + //
                "  <div class=\"u-row\" style=\"margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;\">\n"
                + //
                "    <div style=\"border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;\">\n"
                + //
                "      \n" + //
                "<div class=\"u-col u-col-100\" style=\"max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;\">\n"
                + //
                "  <div style=\"height: 100%;width: 100% !important;\">\n" + //
                "<div style=\"box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;\"><!--<![endif]-->\n"
                + //
                "  \n" + //
                "<table style=\"font-family:'Lato',sans-serif;\" role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" border=\"0\">\n"
                + //
                "  <tbody>\n" + //
                "    <tr>\n" + //
                "      <td style=\"overflow-wrap:break-word;word-break:break-word;padding:25px 10px;font-family:'Lato',sans-serif;\" align=\"left\">\n"
                + //
                "        \n" + //
                "<table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n" + //
                "  <tr>\n" + //
                "    <td style=\"padding-right: 0px;padding-left: 0px;\" align=\"center\">\n" + //
                "      \n" + //
                "      <img align=\"center\" border=\"0\" src=\"" + imageUrl + "\" "
                + " alt=\"Image\" title=\"Image\" style=\"outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 30px;\" width=\"30\"/>\n"
                + //
                "      \n" + //
                "    </td>\n" + //
                "  </tr>\n" + //
                "</table>\n" + //
                "\n" + //
                "      </td>\n" + //
                "    </tr>\n" + //
                "  </tbody>\n" + //
                "</table>\n" + //
                "\n" + //
                "\n" + //
                "  </div>\n" + //
                "</div>\n" + //
                "\n" + //
                "    </div>\n" + //
                "  </div>\n" + //
                "  </div>\n" + //
                "  \n" + //
                "\n" + //
                "\n" + //
                "  \n" + //
                "  \n" + //
                "<div class=\"u-row-container\" style=\"padding: 0px;background-color: transparent\">\n" + //
                "  <div class=\"u-row\" style=\"margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;\">\n"
                + //
                "    <div style=\"border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;\">\n"
                + //
                "      \n" + //
                "<div class=\"u-col u-col-100\" style=\"max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;\">\n"
                + //
                "  <div style=\"height: 100%;width: 100% !important;\">\n" + //
                "<div style=\"box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;\"><!--<![endif]-->\n"
                + //
                "  \n" + //
                "<table style=\"font-family:'Lato',sans-serif;\" role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" border=\"0\">\n"
                + //
                "  <tbody>\n" + //
                "    <tr>\n" + //
                "      <td style=\"overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Lato',sans-serif;\" align=\"left\">\n"
                + //
                "        \n" + //
                "  <h1 style=\"margin: 0px; line-height: 140%; text-align: center; word-wrap: break-word; font-size: 22px; font-weight: 400;\">Sách trực tuyến</h1>\n"
                + //
                "\n" + //
                "      </td>\n" + //
                "    </tr>\n" + //
                "  </tbody>\n" + //
                "</table>\n" + //
                "\n" + //
                "<table style=\"font-family:'Lato',sans-serif;\" role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" border=\"0\">\n"
                + //
                "  <tbody>\n" + //
                "    <tr>\n" + //
                "      <td style=\"overflow-wrap:break-word;word-break:break-word;padding:40px 40px 30px;font-family:'Lato',sans-serif;\" align=\"left\">\n"
                + //
                "        \n" + //
                "  <div style=\"font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;\">\n" + //
                "    <p style=\"font-size: 14px; line-height: 140%;\"><span style=\"font-size: 18px; line-height: 25.2px; color: #666666;\">Xin chào, "
                + fullName + "</span></p>\n"
                + //
                "<p style=\"font-size: 14px; line-height: 140%;\"> </p>\n" + //
                "<p style=\"font-size: 14px; line-height: 140%;\"><span style=\"font-size: 18px; line-height: 25.2px; color: #666666;\">"
                + firstMessage + ".</span></p>\n"
                + //
                "<p style=\"font-size: 14px; line-height: 140%;\"> </p>\n" + //
                "<p style=\"font-size: 14px; line-height: 140%;\"><span style=\"font-size: 18px; line-height: 25.2px; color: #666666;\">"
                + secondMessage + "</span></p>\n"
                + //
                "  </div>\n" + //
                "\n" + //
                "      </td>\n" + //
                "    </tr>\n" + //
                "  </tbody>\n" + //
                "</table>\n" + //
                "\n" + //
                "<table style=\"font-family:'Lato',sans-serif;\" role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" border=\"0\">\n"
                + //
                "  <tbody>\n" + //
                "    <tr>\n" + //
                "      <td style=\"overflow-wrap:break-word;word-break:break-word;padding:0px 40px;font-family:'Lato',sans-serif;\" align=\"left\">\n"
                + //
                "        \n" + //
                "<div align=\"left\">\n" + //
                "    <a href=\"" + url
                + "\" class=\"v-button\" style=\"box-sizing: border-box;display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #e0592d; border-radius: 1px;-webkit-border-radius: 1px; -moz-border-radius: 1px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;font-size: 14px;\">\n"
                + //
                "      <span style=\"display:block;padding:15px 40px;line-height:120%;\"><span style=\"font-size: 18px; line-height: 21.6px;\">"
                + buttonName + "</span></span>\n"
                + //
                "    </a>\n" + //
                "\n" + //
                "</div>\n" + //
                "\n" + //
                "      </td>\n" + //
                "    </tr>\n" + //
                "  </tbody>\n" + //
                "</table>\n" + //
                "\n" + //
                "<table style=\"font-family:'Lato',sans-serif;\" role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" border=\"0\">\n"
                + //
                "  <tbody>\n" + //
                "    <tr>\n" + //
                "      <td style=\"overflow-wrap:break-word;word-break:break-word;padding:40px 40px 30px;font-family:'Lato',sans-serif;\" align=\"left\">\n"
                + //
                "        \n" + //
                "  <div style=\"font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;\">\n" + //
                "    <p style=\"font-size: 14px; line-height: 140%;\"><span style=\"color: #888888; font-size: 14px; line-height: 19.6px;\"><em><span style=\"font-size: 16px; line-height: 22.4px;\">"
                + endMessage + ". </span></em></span></p>\n"
                + //
                "  </div>\n" + //
                "\n" + //
                "      </td>\n" + //
                "    </tr>\n" + //
                "  </tbody>\n" + //
                "</table>\n" + //
                "</div>\n" + //
                "  </div>\n" + //
                "</div>\n" + //
                "\n" + //
                "    </div>\n" + //
                "  </div>\n" + //
                "  </div>\n" + //
                "  \n" + //
                "\n" + //
                "    </td>\n" + //
                "  </tr>\n" + //
                "  </tbody>\n" + //
                "  </table>\n" + //
                "\n" + //
                "</body>\n" + //
                "\n" + //
                "</html>\n";//
        return content;
    }
}
